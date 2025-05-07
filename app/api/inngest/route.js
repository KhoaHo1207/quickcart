// File: /app/api/inngest/[[...inngest]]/route.ts

import { serve } from "inngest/next";
import { inngest, syncUserCreation } from "@/config/inngest"; // Các hàm xử lý sự kiện đã định nghĩa

// Đăng ký các hàm vào webhook server
export const { GET, POST, PUT } = serve({
  client: inngest, // client được cấu hình từ inngest
  functions: [syncUserCreation],
});
