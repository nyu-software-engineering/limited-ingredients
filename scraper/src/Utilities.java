import java.io.IOException;
import java.util.ArrayList;

import org.json.JSONException;
import org.json.JSONObject;
import org.json.JSONTokener;
import org.jsoup.HttpStatusException;
import org.jsoup.Jsoup;
import org.jsoup.nodes.DataNode;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

public final class Utilities {
	/**
	 * The Scrape method connects to a URL that scrapes recipe pages and returns 
	 * an ArrayList of Recipe objects. 
	 * 
	 * @param URL			main URL that contains links to other recipe pages
	 * @return recipeList	ArrayList of recipe objects that are converted into JSON
	 */
	public static ArrayList<Recipe> Scrape(String URL) {
		//List that stores recipe objects
		ArrayList<Recipe> recipeList = new ArrayList<Recipe>();
		try {
			//attempt to connect to URL
			Document homeDoc = null;
			try {
				homeDoc = Jsoup.connect(URL).get();
			} catch(HttpStatusException e) {
				return null;
			} catch(NullPointerException e) {
				return null;
			}
			//get list of recipe page elements
			Elements recipePages = homeDoc.select("section.listicle-page-group-container p span.listicle-page__cta-button a");
			for(Element page: recipePages) {
				//initialize Recipe object
				Recipe recipe = new Recipe();
				//get URL attribute
				String recipeURL = page.attr("href");
				Document recipeDoc = null;
				//attempt to connect to each recipe page
				try {
					recipeDoc = Jsoup.connect(recipeURL).get();
				} catch(HttpStatusException e) {
					continue;
				} catch(NullPointerException e) {
					continue;
				}
				//get data attributes
				Elements nameElem = recipeDoc.select("h1.recipe-title");
				Elements imageElem = recipeDoc.select("div.recipe-image-and-meta-sidebar__featured-container img");
				Elements directionsElem = recipeDoc.select("li.recipe-directions__item");
				Elements JSONElem = recipeDoc.getElementsByTag("script");
				//check if elements are null. if not, set Recipe objects' data fields
				if (nameElem != null) {
					recipe.setName(nameElem.text());
				}
				if (imageElem != null) {
					recipe.setImageURL(imageElem.attr("src"));
				}
				recipe.setURL(recipeURL);
				if (directionsElem != null) {
					ArrayList<String> directionsList = new ArrayList<>(directionsElem.size());
					for (int i = 0; i < directionsElem.size(); i++) {
						directionsList.add(directionsElem.get(i).text());
					}
					recipe.setDirections(directionsList);
				}
				//JSON-specific data found in recipe document
				for (Element elem: JSONElem) {
					for (DataNode node: elem.dataNodes()) {
						if (node.getWholeData().contains("@type")) {
							JSONObject obj = (JSONObject) new JSONTokener(node.getWholeData()).nextValue();
							try {
								recipe.setIngredients(obj.get("recipeIngredient").toString());
								recipe.setPrepTime(obj.getString("prepTime"));
								recipe.setCookTime(obj.getString("cookTime"));
								recipe.setTotalTime(obj.getString("totalTime"));
								recipe.setNutrition(obj.get("nutrition").toString());
							} catch(JSONException e) {
								e.printStackTrace();
							}
						}
					}
				}
				//add to list of recipes
				recipeList.add(recipe);
			}
		} catch (IOException e) {
			e.printStackTrace();
		}
		//return list of recipes
		return recipeList;
	}
}
