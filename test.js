const { Builder, By, until } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
const fs = require("fs");
const path = require("path");

let expect;
(async () => {
  let chai = await import("chai");
  expect = chai.expect;
})();


describe("Word Guessing Game Tests", function () {
  let driver;

  let url = "http://127.0.0.1:5500/selection_code/index.html";

  before(async function () {
    driver = await new Builder().forBrowser("chrome").build();
    await driver.get(url);
  });

  after(async function () {
    await driver.quit();
  });

  it("should check that that index.html file exists", async function () {
    const rootDir = path.resolve(__dirname); 
    const indexPath = path.join(rootDir, "index.html");
    let index_file_exists = fs.existsSync(indexPath);
    expect(index_file_exists).to.equal(true);
  });

  it("should initialize the score to 0", async function () {
    const score = await driver.findElement(By.id("score")).getText();
    expect(score).to.equal("Score: 0");
  });
  
  it("should change words after correct guess", async function () {
    const wordBefore = await driver.findElement(By.id("letters")).getText();
    const guessInput = await driver.findElement(By.id("guess"));
    await guessInput.clear();
    await guessInput.sendKeys("hello"); 

    const checkButton = await driver.findElement(By.id("check"));
    await checkButton.click();

    await driver.wait(async function () {
      const wordAfter = await driver.findElement(By.id("letters")).getText();
      return wordBefore !== wordAfter; 
    }, 200);

    const wordAfter = await driver.findElement(By.id("letters")).getText();
    expect(wordBefore).to.not.equal(wordAfter);
  });

  it("should have the correct page title", async function () {
    const title = await driver.getTitle();
    expect(title).to.equal("Word Guessing Game");
  });

  

  it("should shuffle the letters correctly", async function () {
    const letters = await driver.findElement(By.id("letters")).getText();
    expect(letters.replace(/\s+/g, "")).to.not.equal("hello");
  });

  it('should display "Incorrect, try again." on empty guess', async function () {
    const guessInput = await driver.findElement(By.id("guess"));
    await guessInput.clear();
    const checkButton = await driver.findElement(By.id("check"));
    await checkButton.click();

    const message = await driver.findElement(By.id("message")).getText();
    expect(message).to.equal("Incorrect, try again.");
  });

  it('should display "Incorrect, try again." on wrong guess', async function () {
    const guessInput = await driver.findElement(By.id("guess"));
    await guessInput.clear();
    await guessInput.sendKeys("wrongword");

    const checkButton = await driver.findElement(By.id("check"));
    await checkButton.click();

    const message = await driver.findElement(By.id("message")).getText();
    expect(message).to.equal("Incorrect, try again.");
  });

  it("should increment score on correct guess", async function () {
    const scoreBefore = await driver.findElement(By.id("score")).getText();
    const scoreValueBefore = parseInt(scoreBefore.split(": ")[1]);

    const guessInput = await driver.findElement(By.id("guess"));
    await guessInput.clear();
    await guessInput.sendKeys("hello"); 

    const checkButton = await driver.findElement(By.id("check"));
    await checkButton.click();

    const scoreAfter = await driver.findElement(By.id("score")).getText();
    const scoreValueAfter = parseInt(scoreAfter.split(": ")[1]);

    expect(scoreValueAfter).to.equal(scoreValueBefore);
  });

  it("should not increment score on incorrect guess", async function () {
    const scoreBefore = await driver.findElement(By.id("score")).getText();
    const scoreValueBefore = parseInt(scoreBefore.split(": ")[1]);

    const guessInput = await driver.findElement(By.id("guess"));
    await guessInput.clear();
    await guessInput.sendKeys("wrongword"); 

    const checkButton = await driver.findElement(By.id("check"));
    await checkButton.click();

    const scoreAfter = await driver.findElement(By.id("score")).getText();
    const scoreValueAfter = parseInt(scoreAfter.split(": ")[1]);

    expect(scoreValueAfter).to.equal(scoreValueBefore);
  });

  it('should display "Correct!" on correct guess', async function () {
    const letters = await driver.findElement(By.id("letters")).getText();
    const correctWord = "hello"; 

    const guessInput = await driver.findElement(By.id("guess"));
    await guessInput.clear();
    await guessInput.sendKeys(correctWord);

    const checkButton = await driver.findElement(By.id("check"));
    await checkButton.click();

    const message = await driver.findElement(By.id("message")).getText();
    expect(message).to.equal("Correct!");
  });


});
