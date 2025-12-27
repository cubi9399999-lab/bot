# 🚀 Deploy to Netlify

Hướng dẫn deploy Next.js app lên Netlify.

## 📋 Chuẩn bị

### 1. Push code lên Git (GitHub/GitLab/Bitbucket)
```bash
git add .
git commit -m "Ready for Netlify deployment"
git push origin main
```

### 2. Cài đặt Netlify CLI (tùy chọn)
```bash
npm install -g netlify-cli
```

## 🌐 Deploy trên Netlify

### Phương pháp 1: Deploy trực tiếp từ Git

1. **Truy cập [Netlify](https://netlify.com)**
2. **Đăng nhập** với tài khoản của bạn
3. **Click "Add new site" > "Import an existing project"**
4. **Chọn repository** chứa code của bạn
5. **Cấu hình build settings:**
   - **Build command:** `npm run build`
   - **Publish directory:** `.next`
   - **Node version:** `18.x` (hoặc phiên bản bạn đang dùng)

### Phương pháp 2: Sử dụng Netlify CLI

```bash
# Đăng nhập Netlify
netlify login

# Khởi tạo site mới
netlify init

# Hoặc link với site hiện có
netlify link

# Deploy
netlify deploy --prod
```

## ⚙️ Cấu hình Environment Variables

Trong Netlify dashboard, thêm các biến môi trường:

### Required:
```
NODE_ENV=production
```

### Optional (cho notification system):
```
TELEGRAM_BOT_TOKEN=your_telegram_bot_token
TELEGRAM_CHAT_ID=your_telegram_chat_id
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
EMAIL_TO=recipient@example.com
WEBHOOK_URL=https://script.google.com/macros/s/your_script_id/exec
```

## 🔧 Xử lý API Routes

Nếu bạn sử dụng Next.js API routes, Netlify sẽ tự động chuyển đổi chúng thành Netlify Functions.

## 📁 Cấu trúc file đã tạo

- `netlify.toml` - Cấu hình build và redirects
- `public/_redirects` - Redirect rules cho SPA
- `next.config.mjs` - Đã thêm comment cho static export (nếu cần)

## 🚨 Lưu ý quan trọng

### 1. Node Version
Đảm bảo Netlify sử dụng Node.js version phù hợp (18.x hoặc 20.x)

### 2. Build Settings
- **Build command:** `npm run build`
- **Publish directory:** `.next`

### 3. Environment Variables
Thêm tất cả biến môi trường cần thiết trong Netlify dashboard

### 4. Domain & SSL
Netlify tự động cung cấp HTTPS và custom domain

## 🔍 Troubleshooting

### Build fails
- Kiểm tra Node.js version (nên dùng 18.x hoặc 20.x)
- Đảm bảo tất cả dependencies được liệt kê trong package.json
- Kiểm tra console logs trong Netlify dashboard

### TOML config error
- Nếu gặp lỗi "Could not parse configuration file", thử xóa file `netlify.toml` và chỉ dùng `public/_redirects`
- Netlify sẽ tự động detect Next.js và áp dụng cấu hình mặc định

### Obfuscator issues
- Nếu build fail do obfuscator, thử disable nó bằng cách set `NEXTJS_OBFUSCATOR_ENABLED = "false"`

### API routes không hoạt động
- Đảm bảo API routes được đặt trong `/app/api/` hoặc `/pages/api/`
- Kiểm tra Netlify Functions logs

### Static assets không load
- Kiểm tra đường dẫn trong `public/` folder
- Đảm bảo build output trong `.next/`

## 📞 Hỗ trợ

Nếu gặp vấn đề, kiểm tra:
- [Netlify Documentation](https://docs.netlify.com/)
- [Next.js Deployment Docs](https://nextjs.org/docs/deployment)
- Netlify build logs trong dashboard

## 🎯 Tips tối ưu

1. **Enable Build Caching** để tăng tốc build
2. **Use Netlify Forms** cho contact forms thay vì API routes
3. **Enable Netlify Analytics** để theo dõi traffic
4. **Set up Deploy Previews** cho pull requests

---

**Happy Deploying! 🚀**
