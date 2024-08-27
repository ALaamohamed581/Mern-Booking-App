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
  await page.setInputFiles('[name="ImagesFiles"]', [
    path.join(__dirname, "f", "1.jpg"),
    path.join(__dirname, "f", "2.jpg"),
  ]);
  await page.getByRole("button", { name: "save" }).click();
  await expect(page.getByText("Hotel Created")).toBeVisible();
});

test("should display all users hote data on screen ", async ({ page }) => {
  await page.goto(Ui_URL);
  await page.getByRole("link", { name: "Sing In" }).click();
  // Expect a title "to contain" a substring.
  await expect(page.getByRole("heading", { name: "Sing In" })).toBeVisible();

  await page.locator("[name=email]").fill("1@1.com");
  await page.locator("[name=password]").fill("1@1.com");

  await page.getByRole("button", { name: "SignIn" }).click();

  await page.getByRole("link", { name: "my Hotels" }).click();

  await expect(page.getByRole("heading", { name: "My Hotels" })).toBeVisible();

  await expect(page.getByText("test-hotel").first()).toBeVisible();
  await expect(page.getByText("test-city,test-country").first()).toBeVisible();

  await expect(page.getByRole("link", { name: "Add Hotel" })).toBeVisible();

  await page.getByRole("link", { name: "Add Hotel" }).click();
  await expect(page.locator("[name=name]")).toBeVisible();
});

test("should edit hotel ", async ({ page }) => {
  await page.goto(Ui_URL);
  await page.getByRole("link", { name: "Sing In" }).click();
  // Expect a title "to contain" a substring.
  await expect(page.getByRole("heading", { name: "Sing In" })).toBeVisible();

  await page.locator("[name=email]").fill("1@1.com");
  await page.locator("[name=password]").fill("1@1.com");
  await page.getByRole("button", { name: "SignIn" }).click();

  await page.getByRole("link", { name: "my Hotels" }).click();

  await page.getByRole("link", { name: "view Details" }).first().click();

  await page.waitForSelector('[name="name"]', { state: "attached" });
  await expect(page.locator('[name="name"]')).toHaveValue("test-hotel");
  await page.locator('[name="name"]').fill("upddated test test-hotel");
  await page.getByRole("button", { name: "save" }).click();
  await expect(page.getByText("Hotel Saved!")).toBeVisible();
  await page.reload();
  await expect(page.locator('[name="name"]')).toHaveValue(
    "upddated test test-hotel"
  );
  await page.locator('[name="name"]').fill("test-hotel");
  await page.getByRole("button", { name: "save" }).click();

  //TODO ADD MORE INPUT FIELDS FOR TESTING
});
