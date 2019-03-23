import java.io.FileNotFoundException;
import java.io.PrintWriter;
import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import org.json.JSONArray;

public class Main {
	public static void main(String[] args) {
		ArrayList<String> URLList = Utilities.BuildURL("https://www.tasteofhome.com/recipes/");
		JSONArray JSONArray = new JSONArray();

		for (int i = 0; i < 2; i++) {
			ArrayList<Recipe> recipeList = Utilities.Scrape(URLList.get(i));
			JSONArray = Utilities.ConcatJSONArray(JSONArray, Utilities.ConvertRecipeToJSON(recipeList));
		}
		PrintWriter writer = null;
		try {
			writer = new PrintWriter("data.JSON", "UTF-8");
			writer.println(JSONArray.toString());
		} catch (FileNotFoundException | UnsupportedEncodingException e) {
			e.printStackTrace();
		} finally {
			writer.close();
		}
	}
}
