import { $api } from "@/shared";
import { AxiosResponse } from "axios";
import { GetImagesByWordRequestDTO, UpdateWordRequestDTO } from "./types";
import { ITWord } from "../types";

export async function updateWord(
  wordId: number,
  data: UpdateWordRequestDTO
): Promise<AxiosResponse> {
  return await $api.patch(`/api/words/manage?word_id=${wordId}`, data);
}

export async function getNextWord(): Promise<AxiosResponse<ITWord>> {
  return await $api.get(`/api/words/next`);
}

export async function getImagesByWord(
  word: string,
  page: number
): Promise<AxiosResponse<GetImagesByWordRequestDTO>> {
  return await $api.get(`/api/words/search-images?word=${word}&page=${page}`);
}

export async function getModeratedCount(): Promise<AxiosResponse> {
  return await $api.get(`/api/words/moderated-count`);
}
