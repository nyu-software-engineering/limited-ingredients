import java.util.ArrayList;

import org.json.JSONArray;
import org.json.JSONObject;

public class Main {
	public static void main(String[] args) {
		//link of 100 recipes
		//TODO: update to scrape more recipes
		ArrayList<Recipe> first100 = Utilities.Scrape("https://www.tasteofhome.com/collection/classic-comfort-food-dinners/");
		//TODO: move JSON conversion to Utilities
		//create array of JSON
		JSONArray jsonArray = new JSONArray();
		for (int i = 0; i < first100.size(); i++) {
			//create JSON object
			JSONObject jsonObj = new JSONObject();
			jsonObj.put("name", first100.get(i).getName());
			jsonObj.put("imageURL", first100.get(i).getImageURL());
			jsonObj.put("URL", first100.get(i).getURL());
			jsonObj.put("directions", first100.get(i).getDirections());
			jsonObj.put("ingredients", first100.get(i).getIngredients());
			jsonObj.put("prepTime", first100.get(i).getPrepTime());
			jsonObj.put("cookTime", first100.get(i).getCookTime());
			jsonObj.put("totalTime", first100.get(i).getTotalTime());
			jsonObj.put("nutrition", first100.get(i).getNutrition());
			jsonArray.put(jsonObj);
		}
	}
}
