import java.io.FileNotFoundException;
import java.io.PrintWriter;
import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import org.json.JSONArray;

public class Main {
	public static void main(String[] args) {
		//ArrayList of URLs to scrape recipes from
		ArrayList<String> URLList = Utilities.BuildURL("https://www.tasteofhome.com/recipes/");
		JSONArray JSONArray = new JSONArray();
		//for each url, scrape recipe and concatenate JSON objects after
		for (int i = 0; i < URLList.size(); i++) {
			ArrayList<Recipe> recipeList = Utilities.Scrape(URLList.get(i));
			JSONArray = Utilities.ConcatJSONArray(JSONArray, Utilities.ConvertRecipeToJSON(recipeList));
			System.out.println(JSONArray.length());
			//limiting amount of recipes for database
			if (JSONArray.length() >= 10000) {
				break;
			}
		}
		//print to file
		PrintWriter writer = null;
		try {
			writer = new PrintWriter("data.json", "UTF-8");
			writer.println(JSONArray.toString());
		} catch (FileNotFoundException | UnsupportedEncodingException e) {
			e.printStackTrace();
		} finally {
			writer.close();
		}
	}
}
