#!/usr/bin/perl -w
use strict;
use warnings;

############################################################
### Celso A. Uliana Jr - March 2019
############################################################

#open CSV, "colar01.csv" or die "Couldn't open the file colar01.csv\n";

print "{\n\t\"type\":\"FeatureCollection\",\n\t\"crs\": {\n\t\t\"type\": \"name\",\n\t\t\"properties\": {\n\t\t\t\"name\": \"EPSG:3857\"\n\t\t}\n\t},\n\t\"features\": [";


while(<>){
    
	chomp;

    my @fields = split ",";
    
    if($fields[12] ne "Latitude"){
        print "{\n\t\t\"type\": \"Feature\",\n\t\t\"geometry\": {\n\t\t\t\"type\": \"Point\",\n\t\t\t\"coordinates\": [$fields[12], $fields[13]]\n\t\t}\n\t},\n\t\t";
    }
    
    #print "@fields\n";
	
	#stuff...
}

print "\n]}";

#close CSV;
