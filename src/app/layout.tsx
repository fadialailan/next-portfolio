'use client'
import { Inter } from "next/font/google";
import "./globals.css";
import { icon_url } from "@/scripts/global";
import Link from "next/link";
import { useEffect, useState } from "react";
import gettext from "@/scripts/gettext";
import { THEME } from "@/scripts/enums";
import { useIsMount } from "@/scripts/useIsMount";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const [darkEnabled, setDarkEnabled] = useState<boolean>(false);
  const isMount = useIsMount();
  const theme_key = 'theme';

  useEffect(() => {
    if (isMount) {
      const theme_value = localStorage.getItem(theme_key)
      switch (theme_value) {
        case THEME.DARK:
          setDarkEnabled(true);
          break;
        default:
          setDarkEnabled(false);
          break;
      }
      return;
    }
    if (darkEnabled) {
      localStorage.setItem(theme_key, THEME.DARK);
    } else {
      localStorage.setItem(theme_key, THEME.LIGHT);
    }
  }, [darkEnabled])

  function toggleDarkTheme() {
    setDarkEnabled((darkEnabled) => !darkEnabled)
  }

  return (
    <html lang="en">
      <head>
        <link
          rel="icon"
          type="image/svg+xml"
          href={icon_url}
        />
        <title>Porfolio Website</title>
        <meta name="description" content="a porfolio website used to show my porfolio" />
      </head>
      <body dir="ltr" className={`${inter.className} dark:bg-gray-700 dark:text-white ${darkEnabled && 'dark'}`}>
        <nav className="[&>a]:m-2 p-1">
          <Link href="/">{gettext.gettext('Home')}</Link>
          <Link href="/attrubution">{gettext.gettext('Attribution')}</Link>
          <button className="float-end p-1 border-black dark:border-white border-2 rounded-s border-solid" onClick={toggleDarkTheme}>dark theme</button>
        </nav>
        {children}
      </body>
    </html>
  );
}
