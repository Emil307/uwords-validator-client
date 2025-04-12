import { $api } from "@/shared";
import { AxiosResponse } from "axios";
import { UpdateWordRequestDTO } from "./types";
import { ITWord } from "../types";

export async function updateWord(
  wordId: number,
  data: UpdateWordRequestDTO
): Promise<AxiosResponse> {
  return await $api.patch(`/api/words/manage?word_id=${wordId}`, data);
}

export async function withoutImage(wordId: number): Promise<AxiosResponse> {
  return await $api.delete(`/api/words/manage/picture?word_id=${wordId}`);
}

export async function getNextWord(): Promise<AxiosResponse<ITWord>> {
  return await $api.get(`/api/words/next`);
}

export async function getModeratedCount(): Promise<AxiosResponse> {
  return await $api.get(`/api/words/moderated-count`);
}
