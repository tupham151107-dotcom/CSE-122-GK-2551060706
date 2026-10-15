# CSE122 – InvoicePilot: Trang quản lý khách hàng

## Thông tin trang

- **Đề tài:** InvoicePilot – quản lý hóa đơn và công nợ.
- **Trang thực hiện:** Danh sách khách hàng.
- **Đối tượng sử dụng:** Nhân viên kinh doanh hoặc người phụ trách khách hàng.
- **Mục đích:** Tra cứu và quản lý thông tin liên hệ, trạng thái hợp tác và công nợ khách hàng.
- **Công nghệ:** HTML5, CSS3, JavaScript thuần.

## Chức năng

- Hiển thị danh sách và thống kê tổng khách hàng, khách hàng hoạt động, tổng công nợ.
- Tìm kiếm theo tên, người liên hệ, email, số điện thoại và mã số thuế.
- Lọc theo trạng thái hoạt động.
- Thêm và chỉnh sửa khách hàng bằng form modal; kiểm tra dữ liệu bắt buộc, email và công nợ.
- Xóa khách hàng sau khi xác nhận.
- Lưu dữ liệu bằng `localStorage` của trình duyệt trên thiết bị hiện tại.
- Responsive cho desktop và mobile.

## Cấu trúc

```text
CSE122-GK-QuanLy/
├── index.html   # Cấu trúc trang và form
├── style.css    # Giao diện, bố cục, responsive
├── script.js    # Dữ liệu, render, tìm kiếm/lọc và CRUD
└── README.md    # Mô tả bài làm và thông tin nộp bài
```

## Chạy trang

Mở `index.html` bằng trình duyệt. Không cần cài framework hoặc backend. Dữ liệu mẫu được lưu trong trình duyệt; xóa dữ liệu site của trình duyệt sẽ đặt lại dữ liệu mẫu.

## Giải thích mã nguồn

- `index.html` dùng `header`, `main`, `section`, `article`, `table`, `form`, `label`, `input`, `select` và `button` để chia cấu trúc rõ ràng.
- `style.css` dùng Flexbox và Grid cho bố cục; media query ở cuối file xếp thẻ thống kê và form theo một cột trên màn hình nhỏ.
- `script.js` lưu khách hàng trong mảng object. Hàm `render()` lọc mảng theo từ khóa và trạng thái rồi cập nhật bảng cùng thống kê. Các sự kiện `input`, `change`, `click`, `submit` xử lý tìm kiếm, lọc, mở modal, sửa, xóa và lưu form. `localStorage` giữ thay đổi sau khi tải lại trang.

## Checklist đối chiếu đề giữa kỳ

- [x] Trang thuộc đề tài InvoicePilot và có bố cục desktop/mobile.
- [x] HTML semantic, có form và các nhãn nhập liệu.
- [x] CSS có typography, màu sắc, spacing, hover, Flexbox/Grid và responsive.
- [x] JavaScript có render dữ liệu, tìm kiếm, lọc, modal, validation, thêm/sửa/xóa.
- [x] Có thể mở trực tiếp trên trình duyệt và demo tương tác.
- [ ] Đối chiếu/hoàn thiện bản thiết kế Figma riêng của trang này.
- [ ] Thêm link Figma, repository GitHub cá nhân và video sau khi tạo/có link.

## Ôn tập kiến thức cơ bản trong bài Khách hàng

### HTML

- `header`, `main`, `section`, `article`, `footer` tạo cấu trúc semantic cho trang.
- `h1`, `h2`, `p` hiển thị tiêu đề và mô tả; `a` là liên kết logo về trang; các nút dùng `button`.
- `table`, `thead`, `tbody`, `tr`, `th`, `td` trình bày danh sách khách hàng.
- `form`, `label`, `input`, `select` và `button` tạo form thêm/sửa khách hàng. Tên là trường bắt buộc; email dùng `type="email"` để trình duyệt kiểm tra định dạng.
- Trang không cần ảnh minh họa vì logo IP được dựng bằng chữ và CSS; bảng phù hợp hơn danh sách `<ul>` cho dữ liệu có nhiều cột.

### CSS

- Selector thẻ, class và ID áp dụng kiểu cho các phần khác nhau; biến trong `:root` giữ màu dùng chung.
- `font`, `color`, `margin`, `padding`, `border`, `border-radius`, `width`, `height` định dạng giao diện.
- Flexbox sắp xếp thanh tiêu đề và công cụ tìm/lọc; Grid chia thẻ thống kê và form.
- `:hover` đổi giao diện nút khi rê chuột. Media query `@media (max-width: 700px)` chuyển bố cục sang một cột trên điện thoại.

### JavaScript

- `let customers` lưu danh sách có thể thay đổi; `const` dùng cho phần tử DOM và các giá trị không gán lại.
- Mỗi khách hàng là một object; danh sách khách hàng là array. `filter`, `map`, `reduce` tìm, dựng bảng và tính tổng công nợ.
- Các function như `render`, `openForm`, `persist` chia chương trình theo nhiệm vụ. `if` kiểm tra thao tác thêm/sửa/xóa và dữ liệu công nợ hợp lệ.
- Hàm `$` gọi `document.querySelector`; `textContent` đổi chữ thống kê/thông báo; `innerHTML` dựng các hàng trong bảng; `classList` hiện chưa cần dùng vì trang dùng `dialog.showModal()` và badge class ngay khi render.
- Sự kiện `input` tìm kiếm, `change` lọc trạng thái, `click` mở form/xóa khách hàng, `submit` kiểm tra và lưu form. `required`, `type="email"` hỗ trợ validation của trình duyệt; JavaScript kiểm tra công nợ không âm.

### Câu hỏi giảng viên có thể hỏi

**Hàm `render()` làm gì?**

Đọc từ khóa tìm kiếm, lọc danh sách khách hàng, tạo lại các hàng trong bảng và cập nhật thống kê.

**Vì sao dùng `localStorage`?**

Để giữ danh sách sau khi tải lại trang trên cùng trình duyệt. Đây là lưu trữ cục bộ, không đồng bộ dữ liệu giữa nhiều thiết bị.

**Sự kiện nào chạy khi lưu form?**

Sự kiện `submit` trên form. JavaScript đọc các trường, kiểm tra công nợ, thêm hoặc thay khách hàng trong array, lưu vào `localStorage`, rồi render lại bảng.

**Nếu bỏ listener `input` thì sao?**

Gõ từ khóa sẽ không gọi lại `render()`, vì vậy bảng không lọc theo nội dung vừa nhập.

**Responsive nằm ở đâu?**

Trong media query `@media (max-width: 700px)` ở `style.css`; tại kích thước nhỏ, thống kê, tiêu đề danh sách và form chuyển thành một cột.

**Nếu bỏ `required` ở tên khách hàng thì sao?**

Trình duyệt không tự chặn form khi tên để trống; cần thêm kiểm tra tương ứng trong JavaScript để dữ liệu thiếu không được lưu.

**Nếu bỏ `escapeHtml()` thì sao?**

Nội dung khách hàng được đưa vào `innerHTML` mà không chuyển các ký tự đặc biệt; việc escape giúp hiển thị dữ liệu an toàn và không làm vỡ cấu trúc HTML.

## Link nộp bài

- **Figma:** Chưa được cung cấp.
- **GitHub:** Chưa tạo/cung cấp repository cá nhân.
- **Video trình bày:** Chưa quay; đặt tên theo mẫu `CSE122-GK-SVxx-TenSinhVien-TenTrang`.

> Bài yêu cầu người thực hiện hiểu và giải thích được mã nguồn. Phần lưu `localStorage` chỉ dùng trên trình duyệt hiện tại, không đồng bộ sang thiết bị khác.
