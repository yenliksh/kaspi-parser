import { Injectable } from '@nestjs/common';
import { parse } from 'node-html-parser';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const playwright = require('playwright-aws-lambda');

const url = 'https://kaspi.kz/shop/';

@Injectable()
export class AppService {
  async getInfo(id: number): Promise<string> {
    if (!id) return;
    try {
      const fullUrl = `${url}/p/p-${id}`;

      const browser = await playwright.launchChromium({
        headless: true,
      });
      const context = await browser.newContext();

      const page = await context.newPage();
      await page.goto(fullUrl, {
        waitUntil: 'networkidle0',
      });

      const data = await page.evaluate(
        () => document.querySelector('*').outerHTML,
      );

      await browser.close();

      const root = parse(data);

      const name = root.querySelector('.item__heading')?.innerHTML;

      const price = root.querySelector('.item__price-once').innerHTML;

      return `Название: ${name}, цена: ${price}`;
    } catch (e) {
      return `Ошибка: ${e}`;
    }
  }

  async getMinPrice(id: number): Promise<string> {
    if (!id) return;
    try {
      const fullUrl = `${url}/p/p-${id}`;

      const browser = await playwright.launchChromium({
        headless: true,
      });
      const context = await browser.newContext();

      const page = await context.newPage();
      await page.goto(fullUrl, {
        waitUntil: 'networkidle0',
      });

      const data = await page.evaluate(
        () => document.querySelector('*').outerHTML,
      );

      await browser.close();

      const root = parse(data);

      const price = root.querySelector('.item__price-once').innerHTML;

      return `Минимальная цена: ${price}`;
    } catch (e) {
      return `Ошибка: ${e}`;
    }
  }

  async getSellerSpot(id: number): Promise<string> {
    if (!id) return;
    try {
      const fullUrl = `${url}/info/merchant/${id}/address-tab/?merchantId=${id}`;

      const browser = await playwright.launchChromium({
        headless: true,
      });
      const context = await browser.newContext();

      const page = await context.newPage();
      await page.goto(fullUrl, {
        waitUntil: 'networkidle0',
      });

      const data = await page.evaluate(
        () => document.querySelector('*').outerHTML,
      );

      await browser.close();

      const root = parse(data);

      const spot = root.querySelector('.merchant-profile__name').innerHTML;

      return spot;
    } catch (e) {
      return `Ошибка: ${e}`;
    }
  }
}
