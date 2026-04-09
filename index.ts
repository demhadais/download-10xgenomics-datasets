import { chromium, type Page } from "playwright";

async function clickSoftwareCheckbox(page: Page, softwareName: string) {
  const label = page
    .locator("label")
    .filter({ has: page.getByText(softwareName, { exact: true }) });
  const checkbox = label.getByRole("checkbox");
  const innerHtml = await label.innerHTML();
  console.log(innerHtml);

  // console.log("we found the label");
  // await label.click();
  // console.log("we clicked");
  // const table = page.getByRole("table");
  // table.waitFor({ state: "visible" });
  // console.log("did we wait for table?");

  const rows = await page.locator("td").all();
  for (const r of rows) {
    console.log(await r.allInnerTexts());
  }
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
