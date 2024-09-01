import { test, expect } from "@playwright/test";
import exp from "constants";
const Ui_URL = "http://localhost:5173";

test("should show hotel search resaluts ", async ({ page }) => {
  await page.goto(Ui_URL);
  await page.getByRole("link", { name: "Sing In" }).click();
  // Expect a title "to contain" a substring.
  await expect(page.getByRole("heading", { name: "Sing In" })).toBeVisible();

  await page.locator("[name=email]").fill("1@1.com");
  await page.locator("[name=password]").fill("1@1.com");

  await page.getByRole("button", { name: "SignIn" }).click();

  await page.getByPlaceholder("whare are you going").fill("test");
  await page.getByRole("button", { name: "Search" }).click();
  await expect(page.getByText("Total Hotles in test")).toBeVisible();
  await expect(page.getByText("test-hotel").first()).toBeVisible();
});

test("shoud show hotel detail ", async ({ page }) => {
  await page.goto(Ui_URL);
  await page.getByRole("link", { name: "Sing In" }).click();
  // Expect a title "to contain" a substring.
  await expect(page.getByRole("heading", { name: "Sing In" })).toBeVisible();

  await page.locator("[name=email]").fill("1@1.com");
  await page.locator("[name=password]").fill("1@1.com");

  await page.getByRole("button", { name: "SignIn" }).click();

  await page.getByPlaceholder("whare are you going").fill("test");
  await page.getByRole("button", { name: "Search" }).click();

  await page.getByText("test-hotel").first().click();

  await expect(page).toHaveURL(/detail/);
  await expect(page.getByRole("button", { name: "Book now" })).toBeVisible();
});

test("should book hotail", async ({ page }) => {
  await page.goto(Ui_URL);
  await page.getByRole("link", { name: "Sing In" }).click();
  // Expect a title "to contain" a substring.
  await expect(page.getByRole("heading", { name: "Sing In" })).toBeVisible();

  await page.locator("[name=email]").fill("1@1.com");
  await page.locator("[name=password]").fill("1@1.com");

  await page.getByRole("button", { name: "SignIn" }).click();
  await page.getByPlaceholder("whare are you going").fill("test");

  const date = new Date();
  date.setDate(date.getDate() + 3);

  const formatedDate = date.toISOString().split("T")[0];

  await page.getByPlaceholder("chick-out date").fill(formatedDate);
  await page.getByRole("button", { name: "search" }).click();

  await page.getByText("test-hotel").first().click();

  await expect(page).toHaveURL(/detail/);
  await page.getByRole("button", { name: "Book now" }).click();

  const streipeFrame = page.frameLocator("iframe").first();
  await streipeFrame
    .locator("[placeholder='Card number']")
    .fill("4242424242424242");

  await streipeFrame.locator('[placeholder="MM / YY"]').fill("04/30");
  await streipeFrame.locator('[placeholder="CVC"]').fill("258");
  await streipeFrame.locator('[placeholder="ZIP"]').fill("24225");

  // await expect(page.getByText("TotalCost :$300")).toBeVisible();

  await page.getByRole("button", { name: "Confrim Booking" }).click();

  await page.getByRole("link", { name: "my Bokings" }).click();

  await expect(page.getByText("test-hotel").first()).toBeVisible();
});
