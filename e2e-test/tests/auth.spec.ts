import { test, expect } from "@playwright/test";

const Ui_URL = "http://localhost:5173/";
test("has title", async ({ page }) => {
  await page.goto(Ui_URL);
  await page.getByRole("link", { name: "Sing In" }).click();
  // Expect a title "to contain" a substring.
  await expect(page.getByRole("heading", { name: "Sing In" })).toBeVisible();

  await page.locator("[name=email]").fill("1@1.com");
  await page.locator("[name=password]").fill("1@1.com");

  await page.getByRole("button", { name: "SignIn" }).click();

  await expect(page.getByText("welcome Back")).toBeVisible();
  await expect(page.getByRole("link", { name: "my Bokings" })).toBeVisible();
  await expect(page.getByRole("link", { name: "my Hotels" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Sign Out" })).toBeVisible();
});

test("should allow user to regsiter", async ({ page }) => {
  //#TODO dynamic email
  await page.goto(Ui_URL);
  await page.getByRole("link", { name: "Sing In" }).click();
  await page.getByRole("link", { name: "Create a account here" }).click();

  await expect(
    page.getByRole("heading", { name: "Create an Account" })
  ).toBeVisible();

  await page.locator("[name=firstName]").fill("name");
  await page.locator("[name=lastName]").fill("name");
  await page.locator("[name=email]").fill("331@gmail.com");
  await page.locator("[name=password]").fill("1@1.com");
  await page.locator("[name=confirmPassword]").fill("1@1.com");

  await page.getByRole("button", { name: "Create Acoount" }).click();

  await expect(page.getByText("Regsitation success")).toBeVisible();
  await expect(page.getByRole("link", { name: "my Bokings" })).toBeVisible();
  await expect(page.getByRole("link", { name: "my Hotels" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Sign Out" })).toBeVisible();
});
