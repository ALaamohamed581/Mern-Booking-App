import { test, expect } from "@playwright/test";
import path from "path";

const Ui_URL = "http://localhost:5173";

test("has title", async ({ page }) => {});

test("should allow users to add hoteles", async ({ page }) => {
  await page.goto(Ui_URL);
  await page.getByRole("link", { name: "Sing In" }).click();
  // Expect a title "to contain" a substring.
  await expect(page.getByRole("heading", { name: "Sing In" })).toBeVisible();

  await page.locator("[name=email]").fill("1@1.com");
  await page.locator("[name=password]").fill("1@1.com");

  await page.getByRole("button", { name: "SignIn" }).click();

  await expect(page.getByText("welcome Back")).toBeVisible();
  await page.goto(`${Ui_URL}/addhotel`);
  await page.locator("[name=name]").fill("test-hotel");
  await page.locator("[name=city]").fill("test-city");
  await page.locator("[name=country]").fill("test-country");
  await page
    .locator("[name=description]")
    .fill(
      "test-countdescriptiondescriptiondescriptiondescriptiondescriptionry"
    );

  await page.getByText("Budget").click();

  await page.getByLabel("Free wifi").check();
  await page.getByLabel("Parking").check();

  await page.selectOption("select[name='starRating']", "3");

  await page.locator("[name='pricePerNight']").fill("100");
  await page.locator('[name="adultCount"]').fill("2");
  await page.locator('[name="childCount"]').fill("6");
  await page.setInputFiles('[name="Images"]', [
    path.join(__dirname, "f", "1.jpg"),
    path.join(__dirname, "f", "3.jpg"),
  ]);
  await page.getByRole("button", { name: "save" }).click();
  await expect(page.getByText("Hotel Created")).toBeVisible();
});
