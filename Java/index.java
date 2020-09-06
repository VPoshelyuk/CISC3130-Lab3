package Java;

import java.io.*;  
import java.util.Scanner;  

public class index  {
    public static void main(String[] args) throws Exception {  
        Scanner scanner = new Scanner(new File("../data/regional-global-daily-latest.csv"));  
        int counter = 0;
        String[][] arrays = new String[200][2];
        while (scanner.hasNextLine()) {  
            String artist;
            boolean found = false;
            String line = scanner.nextLine();
            if("123456789".contains(String.valueOf(line.charAt(0)))){
                artist = line.split(",(?=([^\"]*\"[^\"]*\")*[^\"]*$)")[2];
                if(artist.startsWith("\"")) {
                    artist = artist.substring(1, artist.length() - 1);
                }
                for(int i = 0; i < counter; i++) {
                    if(artist.equals(arrays[i][0])){
                        arrays[i][1] = Integer.toString(Integer.parseInt(arrays[i][1])+1);
                        found = true;
                        break;
                    }
                }
                if(!found){
                    arrays[counter][0] = artist;
                    arrays[counter][1] = "1";
                    counter++;
                }
            }
        }   
        scanner.close();

        for(int i = 0; i < counter; i++) {
            System.out.println(arrays[i][0] + " - " + arrays[i][1]);
        }
    }  

}  