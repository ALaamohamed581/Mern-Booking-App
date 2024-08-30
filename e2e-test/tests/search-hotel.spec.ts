import { test, expect } from "@playwright/test";
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

test("shoud show htel detail ", async ({ page }) => {
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
  await expect(
    page.getByRole("button", { name: "Sign in to book" })
  ).toBeVisible();
});
