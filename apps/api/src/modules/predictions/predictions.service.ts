import type {
  WaitTimePredictionInput,
  WaitTimePredictionResult
} from "@smart-hospital/shared";
import { buildPrediction } from "../../data/seed-data.js";

export function predictWaitTime(
  input: WaitTimePredictionInput
): WaitTimePredictionResult {
  return buildPrediction(input);
}
