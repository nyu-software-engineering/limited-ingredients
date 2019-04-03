import java.io.IOException;
import java.util.ArrayList;
import org.json.JSONArray;
import org.json.JSONObject;
import org.json.JSONException;
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
			Elements recipePages = homeDoc.select("li.single-recipe a");
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
				Elements ingredientElem = recipeDoc.select("ul.recipe-ingredients__list li");
				Elements directionsElem = recipeDoc.select("li.recipe-directions__item");
				Elements JSONElem = recipeDoc.getElementsByTag("script");
				//check if elements are null. if not, set Recipe objects' data fields
				if (nameElem != null) {
					recipe.setName(nameElem.text());
				} else {
					recipe.setName("INVALID");
				}
				if (imageElem != null) {
					recipe.setImageURL(imageElem.attr("src"));
				} else {
					recipe.setName("INVALID");
				}
				if (ingredientElem != null) {
					ArrayList<String> ingredientList = new ArrayList<>(ingredientElem.size());
					for (int i = 0; i < ingredientElem.size(); i++) {
						ingredientList.add(ingredientElem.get(i).text());
					}
					recipe.setIngredients(ingredientList);
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
								recipe.setPrepTime(obj.getString("prepTime"));
								recipe.setCookTime(obj.getString("cookTime"));
								recipe.setTotalTime(obj.getString("totalTime"));
								recipe.setNutrition(obj.get("nutrition").toString());
							} catch(JSONException e) {
								e.printStackTrace();
								recipe.setPrepTime("INVALID");
								recipe.setCookTime("INVALID");
								recipe.setTotalTime("INVALID");
								recipe.setNutrition("INVALID");
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
	/**
	 * The ConvertRecipeToJson method takes an ArrayList of recipes and converts each recipe into a 
	 * JSON object that is returned in a JSONArray
	 * @param recipeList	ArrayList of recipe objects
	 * @return JSONArray	JSONArray of JSON objects
	 */
	public static JSONArray ConvertRecipeToJSON(ArrayList<Recipe> recipeList) {
		//create array of JSON
		JSONArray jsonArray = new JSONArray();
		for (int i = 0; i < recipeList.size(); i++) {
			//create JSON object
			JSONObject jsonObj = new JSONObject();
			jsonObj.put("name", recipeList.get(i).getName());
			jsonObj.put("imageURL", recipeList.get(i).getImageURL());
			jsonObj.put("URL", recipeList.get(i).getURL());
			jsonObj.put("directions", recipeList.get(i).getDirections());
			jsonObj.put("ingredients", recipeList.get(i).getIngredients());
			jsonObj.put("prepTime", recipeList.get(i).getPrepTime());
			jsonObj.put("cookTime", recipeList.get(i).getCookTime());
			jsonObj.put("totalTime", recipeList.get(i).getTotalTime());
			jsonObj.put("nutrition", recipeList.get(i).getNutrition());
			jsonArray.put(jsonObj);
		}
		return jsonArray;
	}
	/**
	 * The BuildURL method takes a url and returns an ArrayList of recipe sites
	 * @param URL			URL of recipe site
	 * @return ArrayList 	ArrayList of all recipe sites
	 */
	public static ArrayList<String> BuildURL(String URL) {
		ArrayList<String> URLList = new ArrayList<String>();
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
			Elements pageNum = homeDoc.select("a.page-numbers");
			if (pageNum != null) {
				int lastPage = Integer.parseInt(pageNum.get(pageNum.size()-2).text().replace(",", ""));
				for (int i = 1; i <= lastPage; i++) {
					URLList.add("https://www.tasteofhome.com/recipes/page/" + i + "/");
				}
			}
		} catch (IOException e) {
			e.printStackTrace();
		}
		return URLList;
	}
	/**
	 * The ConcatJSONArray takes 2 jsonArrays and concatenates their JSON objects together
	 * @param JSONArrays
	 * @return	JSONArray	JSONArray of concatenated JSON objects
	 */
	public static JSONArray ConcatJSONArray(JSONArray jsonArr1, JSONArray jsonArr2) {
		JSONArray result = jsonArr1;
		for (int i = 0; i < jsonArr2.length(); i++) {
			result.put(jsonArr2.get(i));
		}
		return result;
	}
}
