import { webkit, type Page } from "playwright";

async function clickSoftwareCheckbox(page: Page, softwareName: string) {
  const label = page
    .locator("label")
    .filter({ has: page.getByText(softwareName, { exact: true }) });

  const rows = await page.locator("td").all();
  if (rows.length === 50) {
    console.log("50 rows!");
  }

  for (const r of rows) {
    console.log(await r.innerHTML());
  }
}

async function downloadAllDatasets() {
  const browser = await webkit.launch();
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
