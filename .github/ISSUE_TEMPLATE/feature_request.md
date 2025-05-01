name: Feature Request
description: Suggest an idea for this project
title: "[Feature] <短いタイトル>"
labels: ["enhancement"]
assignees: ''

---

**概要**
<!-- この機能が解決する問題や目的を簡潔に説明してください -->
例: ユーザーがメールリンク／OAuthでログインできるようにする

**期待される動作 (受け入れ条件)**
<!-- この機能がどのように動作すべきか、具体的な条件をリストアップしてください -->
1. 条件1
2. 条件2
3. ...

**変更箇所候補**
<!-- 実装にあたって変更が必要になりそうなファイルをリストアップしてください（任意） -->
- `src/lib/auth.ts`
- `src/pages/login.tsx`

**実装アイデア・参考情報 (任意)**
<!-- 実装に関するアイデアや参考になるコードスニペット、リンクなどがあれば記載してください -->
```ts
// 例
await supabase.auth.signInWithOtp({ email });
``` 