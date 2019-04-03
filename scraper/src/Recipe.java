import java.util.ArrayList;

public class Recipe {
	private String name;
	private String imageURL;
	private String URL;
	private ArrayList<String> ingredients;
	private ArrayList<String> directions;
	private String prepTime;
	private String cookTime;
	private String totalTime;
	private String nutrition;
	public Recipe() {
		this.name = "";
		this.imageURL = "";
		this.URL = "";
		this.ingredients = new ArrayList<String>();
		this.directions = new ArrayList<String>();
		this.prepTime = "";
		this.cookTime = "";
		this.totalTime = "";
		this.nutrition = "";
	}
	public void setName(String name) {
		this.name = name;
	}
	public void setImageURL(String imageURL) {
		this.imageURL = imageURL;
	}
	public void setURL(String url) {
		this.URL = url;
	}
	public void setIngredients(ArrayList<String> ingredients) {
		this.ingredients = ingredients;
	}
	public void setDirections(ArrayList<String> directions) {
		this.directions = directions;
	}
	public void setPrepTime(String prepTime) {
		this.prepTime = prepTime;
	}
	public void setCookTime(String cookTime) {
		this.cookTime = cookTime;
	}
	public void setTotalTime(String totalTime) {
		this.totalTime = totalTime;
	}
	public void setNutrition(String nutrition) {
		this.nutrition = nutrition;
	}
	public String getName() {
		return this.name;
	}
	public String getImageURL() {
		return this.imageURL;
	}
	public String getURL() {
		return this.URL;
	}
	public ArrayList<String> getIngredients() {
		return this.ingredients;
	}
	public ArrayList<String> getDirections() {
		return this.directions;
	}
	public String getPrepTime() {
		return this.prepTime;
	}
	public String getCookTime() {
		return this.cookTime;
	}
	public String getTotalTime() {
		return this.totalTime;
	}
	public String getNutrition() {
		return this.nutrition;
	}
}
