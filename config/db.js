import mongoose from "mongoose";

let cached = global.mongoose;
/*
Tạo biến cached để kiểm tra xem đã lưu kết nối MongoDB vào biến toàn cục global.mongoose chưa.

Việc dùng global giúp giữ kết nối lâu dài qua các lần gọi API (vì Next.js thường "reload" server nhiều lần khi phát triển).
*/
if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}
/*
Nếu global.mongoose chưa tồn tại:

Khởi tạo nó là { conn: null, promise: null }

conn: sẽ lưu kết nối thật sau khi tạo.

promise: lưu Promise kết nối đang được thực hiện (tránh trùng lặp khi nhiều request đồng thời gọi connectDB()).
*/
async function connectDB() {
  if (cached.conn) {
    return cached.conn;
  }
  //Nếu đã có conn (tức là kết nối MongoDB đã hoàn tất) → dùng lại, không cần kết nối lại nữa.
  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      //   useNewUrlParser: true,
      //   useUnifiedTopology: true,
    };

    /*
Nếu chưa có promise đang chạy (nghĩa là chưa gọi mongoose.connect) → tạo tùy chọn opts.

bufferCommands: false: tắt việc lưu lệnh khi kết nối chưa sẵn sàng (giúp giảm lỗi và tăng hiệu năng).

*/
    cached.promise = mongoose
      .connect(`${process.env.MONGODB_URI}/quickcart`, opts)
      .then((mongoose) => {
        return mongoose;
      });
  }
  /*
Lưu promise của kết nối vào cached.promise.

mongoose.connect(...): Kết nối đến MongoDB bằng URI từ biến môi trường.

/quickcart: là tên database.

Sau khi kết nối thành công, .then(...) trả về đối tượng mongoose.
*/
  cached.conn = await cached.promise;
  return cached.conn;

  /*
 Chờ cho kết nối hoàn tất, rồi lưu conn để tái sử dụng lần sau.

Cuối cùng, trả về conn.
*/
}

export default connectDB;
