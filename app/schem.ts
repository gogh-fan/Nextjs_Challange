import { z } from "zod";

export const responseSchema = z.object({
    payload: z
        .string()
        .min(1, "댓글 내용을 입력해주세요")
        .max(280, "댓글은 280자 이하여야 합니다"),
});