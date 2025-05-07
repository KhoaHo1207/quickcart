// File: /app/api/inngest/[[...inngest]]/route.ts

import { serve } from "inngest/next";
import {
  inngest,
  syncUserCreation,
  syncUserDeletion,
  syncUserUpdation,
} from "@/config/inngest"; // Các hàm xử lý sự kiện đã định nghĩa

// Đăng ký các hàm vào webhook server
export const { GET, POST, PUT } = serve({
  client: inngest, // client được cấu hình từ inngest
  functions: [syncUserCreation, syncUserDeletion, syncUserUpdation], // Các hàm xử lý sự kiện đã định nghĩa
}).createHandler({
  onError: (error) => {
    console.error("Error in Inngest function:", error);
  },
  onResponse: (response) => {
    console.log("Inngest function response:", response);
  },
  onRequest: (request) => {
    console.log("Inngest function request:", request);
  },
  onNext: (next) => {
    console.log("Inngest function next:", next);
  },
  onInit: (init) => {
    console.log("Inngest function init:", init);
  },
  onStart: (start) => {
    console.log("Inngest function start:", start);
  },
  onEnd: (end) => {
    console.log("Inngest function end:", end);
  },
  onComplete: (complete) => {
    console.log("Inngest function complete:", complete);
  },
  onTimeout: (timeout) => {
    console.log("Inngest function timeout:", timeout);
  },
  onAbort: (abort) => {
    console.log("Inngest function abort:", abort);
  },
  onRetry: (retry) => {
    console.log("Inngest function retry:", retry);
  },
  onSuccess: (success) => {
    console.log("Inngest function success:", success);
  },
  onFailure: (failure) => {
    console.log("Inngest function failure:", failure);
  },
  onProgress: (progress) => {
    console.log("Inngest function progress:", progress);
  },
  onCancel: (cancel) => {
    console.log("Inngest function cancel:", cancel);
  },
  onPause: (pause) => {
    console.log("Inngest function pause:", pause);
  },
  onResume: (resume) => {
    console.log("Inngest function resume:", resume);
  },
  onRetryAfter: (retryAfter) => {
    console.log("Inngest function retry after:", retryAfter);
  },
  onRetryDelay: (retryDelay) => {
    console.log("Inngest function retry delay:", retryDelay);
  },
  onRetryCount: (retryCount) => {
    console.log("Inngest function retry count:", retryCount);
  },
  onRetryMax: (retryMax) => {
    console.log("Inngest function retry max:", retryMax);
  },
  onRetryMin: (retryMin) => {
    console.log("Inngest function retry min:", retryMin);
  },
  onRetryMaxDelay: (retryMaxDelay) => {
    console.log("Inngest function retry max delay:", retryMaxDelay);
  },
  onRetryMinDelay: (retryMinDelay) => {
    console.log("Inngest function retry min delay:", retryMinDelay);
  },
});
