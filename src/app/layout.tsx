import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";
import { headers } from "next/headers";

import { pageNavigation, INavigation } from "@/helper/configs";

const isActive = (data: string) => {
  const headersList = headers();
  const pathname = headersList.get("x-current-path");
  if (pathname === data) {
    return "contained";
  }
  return "outlined";
};

const showLayout = async () => {
  const headersList = headers();
  const pathname = headersList.get("x-current-path");
  if (pathname === "/login") {
    return "";
  }
  return (
    <ButtonGroup aria-label="Page Size:">
      {pageNavigation.map((item: INavigation) => (
        <Button
          key="item.label"
          variant={isActive(item.value)}
          href={item.value}
        >
          {item.label}
        </Button>
      ))}
    </ButtonGroup>
  );
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div>{showLayout()}</div>
        {children}
      </body>
    </html>
  );
}
