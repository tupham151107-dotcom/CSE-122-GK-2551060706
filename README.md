# InvoicePilot – Quản lý hóa đơn và công nợ

## Trang thực hiện

**Quản lý khách hàng – Vai trò Quản trị viên**

Trang dành cho quản trị viên doanh nghiệp, dùng để xem và quản lý hồ sơ khách hàng, thông tin liên hệ, trạng thái hoạt động và công nợ.

## Chức năng chính

- Xem tổng số khách hàng, khách hàng đang hoạt động và tổng công nợ.
- Tìm khách hàng theo tên, email hoặc mã số thuế.
- Lọc danh sách theo trạng thái hoạt động.
- Thêm và chỉnh sửa thông tin khách hàng bằng form.
- Kiểm tra tên bắt buộc, định dạng email và giá trị công nợ không âm.
- Xóa khách hàng sau khi xác nhận.
- Lưu dữ liệu bằng `localStorage` để giữ thay đổi khi tải lại trang trên cùng trình duyệt.
- Hiển thị responsive trên desktop và mobile.

## Công nghệ sử dụng

- HTML5 semantic.
- CSS3, Flexbox, CSS Grid và Media Query.
- JavaScript thuần, DOM và `localStorage`.

## Cấu trúc repository

```text
CSE-122-GK-2551060706/
├── index.html   # Cấu trúc trang và form khách hàng
├── style.css    # Giao diện và responsive
├── script.js    # Render, tìm kiếm, lọc, thêm/sửa/xóa và lưu dữ liệu
└── README.md    # Mô tả bài làm và liên kết nộp bài
```

## Cách chạy

Mở `index.html` bằng trình duyệt. Không cần cài framework hoặc backend. Dữ liệu mẫu được khai báo trong `script.js`; thay đổi được lưu trong `localStorage` của trình duyệt hiện tại, chưa đồng bộ với thiết bị khác hoặc Supabase.

## Giải thích mã nguồn

- `index.html` dùng `header`, `main`, `section`, `article`, `table`, `dialog` và `form` để chia nội dung theo ngữ nghĩa.
- `style.css` định dạng màu sắc, chữ, khoảng cách, nút, bảng và modal; Flexbox/Grid bố trí nội dung; Media Query chuyển bố cục cho màn hình nhỏ.
- `script.js` lưu khách hàng dưới dạng mảng object. `render()` lọc dữ liệu và cập nhật bảng/thống kê. Các sự kiện `input`, `change`, `click`, `submit` xử lý tìm kiếm, lọc, mở modal, xác thực form và lưu thay đổi.

## Liên kết nộp bài

- **Figma:** [Thiết kế InvoicePilot](https://www.figma.com/design/IcxgOTkl8vWqJA3OwSwYOK/Untitled?node-id=32-2&p=f&t=YgCqsEQ0xOSeMfrq-0)
- **GitHub:** [CSE-122-GK-2551060706](https://github.com/tupham151107-dotcom/CSE-122-GK-2551060706)
- **Video trình bày:** Chưa có link video. Tên video theo mẫu `CSE122-GK-SVxx-TenSinhVien-QuanLyKhachHangQuanTriVien`.

## Nội dung video dự kiến

Video khoảng 3 phút gồm: giới thiệu đề tài và trang; trình bày bố cục Figma; giới thiệu sản phẩm; giải thích HTML/CSS/JavaScript; demo tìm kiếm, lọc hoặc thêm khách hàng.
