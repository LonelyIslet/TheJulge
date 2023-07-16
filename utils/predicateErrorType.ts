import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

export const isFetchBaseQueryError = (
  error: unknown,
): error is FetchBaseQueryError => {
  return typeof error === "object" && error != null && "status" in error;
};

export const isErrorWithMessage = (
  error: unknown,
): error is { message: string } => {
  return (
    typeof error === "object"
    && error != null
    && "message" in error
    && typeof error?.message === "string"
  );
};
