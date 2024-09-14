"use server";

import { slates } from "@prisma/client";
import { revalidateTag } from "next/cache";

import { prisma } from "@/app/api/__prismaClient";
import { requireUser } from "@/app/api/auth/getUser";
import { PicksFormFields, PicksFormSchema } from "@/app/types/picks";

export const getUserPicksForSlate = async (slate_id: slates["id"]) => {
  const user = await requireUser();

  const slate = await prisma.slates.findUnique({
    where: {
      id: slate_id,
      deleted_at: null,
    },
  });

  if (!slate) {
    throw Error("Slate not found");
  }

  const props = await prisma.props.findMany({
    where: {
      slate_id: slate.id,
      deleted_at: null,
    },
  });

  const picks = await prisma.picks.findMany({
    where: {
      slate_id: slate.id,
      created_by: user?.id,
      deleted_at: null,
    },
  });

  return { props, picks };
};

export const createPicks = async (data: PicksFormFields) => {
  const user = await requireUser();

  const result = await validateUserPicks(data);

  // Check if this user has already made picks for this slate
  const previousPicks = await prisma.picks.findMany({
    where: {
      slate_id: result.slate_id,
      created_by: user.id,
    },
  });

  if (previousPicks.length > 0) {
    await updatePicks(result);
    return;
  }

  const picks = await prisma.picks.createMany({
    data: result.picks.map((pick) => ({
      slate_id: result.slate_id,
      prop_id: pick.prop_id,
      selection: pick.selection,
      is_locked: true,
      created_by: user?.id,
      created_at: new Date(),
      modified_at: new Date(),
    })),
  });

  revalidateTag("picks");

  return picks;
};

export const updatePicks = async (data: PicksFormFields) => {
  const user = await requireUser();

  const result = await validateUserPicks(data);

  const picks = await prisma.picks.findMany({
    where: {
      slate_id: result.slate_id,
      created_by: user?.id,
      deleted_at: null,
    },
  });

  await Promise.all(
    picks.map(async (pick) => {
      return await prisma.picks.update({
        where: {
          id: pick.id,
        },
        data: {
          selection: result.picks.find((p) => p.prop_id === pick.prop_id)
            ?.selection,
          modified_at: new Date(),
        },
      });
    }),
  );

  const updatedPicks = await prisma.picks.findMany({
    where: {
      slate_id: result.slate_id,
      created_by: user?.id,
      deleted_at: null,
    },
  });

  revalidateTag("picks");
  return updatedPicks;
};

const validateUserPicks = async (data: PicksFormFields) => {
  await requireUser();

  const result = PicksFormSchema.parse(data);

  const props = await prisma.props.findMany({
    where: {
      slate_id: result.slate_id,
      deleted_at: null,
    },
  });

  const doAllPropsHaveBet = props.every((prop) => {
    return result.picks.find((pick) => pick.prop_id === prop.id);
  });

  if (!doAllPropsHaveBet) {
    throw Error("There is a prop missing a bet!");
  }
  return result;
};
