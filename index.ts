import { chromium, type Page } from "playwright";

async function clickSoftwareCheckbox(page: Page, softwareName: string) {
  const something = page.getByText(softwareName, { exact: true });
  await something.waitFor({ state: "visible" });
}

async function downloadAllDatasets() {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto("https://www.10xgenomics.com/datasets");

  const softwares = [
    "Cell Ranger",
    "Cell Ranger ATAC",
    "Cell Ranger ARC",
    "Space Ranger",
  ];

  for (const softwareName of softwares) {
    await clickSoftwareCheckbox(page, softwareName);
  }
}

await downloadAllDatasets();
