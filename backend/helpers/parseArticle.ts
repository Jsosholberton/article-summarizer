import axios from "axios";
import {load} from 'cheerio';

/**
 * This function get the article from the url
 * @param url
 * @returns title and text of the article
 */
export const getArticle = async (url: string): Promise<{ title: string, body: string } | null> => {
  try {
    const response = await axios.get(url);
    const html = response.data;

    const $ = load(html);

    // Extract text from paragraphs, headers, and lists
    const title = $("h1").text().trim();
    const paragraphs = $("p").text().trim();
    const headers = $("h1, h2, h3, h4, h5, h6").text().trim();
    const lists = $("li").text().trim();
    return {title: title, body: `${headers}\n\n${paragraphs}\n\n${lists}`}
  } catch (e) {
    console.log(e);
    return null;
  }
}
