// src/client/helper/getCookies.tsx
export function getCookie(name: string): string | null {
  const cookieMatch = document.cookie.match(
    new RegExp(
      `(?:^|; )${name.replace(/([.$?*|{}()[\]\\/+^])/g, "\\$1")}=([^;]*)`,
    ),
  );
  return cookieMatch ? decodeURIComponent(cookieMatch[1]) : null;
}
