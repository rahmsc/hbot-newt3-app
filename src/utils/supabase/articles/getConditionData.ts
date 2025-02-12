import { getConditionWithCategory } from "./getConditionWithCategory";

export async function getConditionData(conditionId: number) {
  const { condition_name } = (await getConditionWithCategory(conditionId)) ?? {
    condition_name: "Unknown",
  };

  return condition_name;
}
