#!/usr/bin/perl -w
use strict;
use warnings;

############################################################
### Celso A. Uliana Jr - March 2019
############################################################

my $csvFileName = shift;
my $geojsonFileName = "geojson" . "$csvFileName" . ".json";
my %dataHash;
my $i = 1;

open CSV, "$csvFileName" or die "Couldn't open the file $csvFileName\n";

while(<CSV>){
	chomp;

    my @fields = split ",";
    
    if($i != 1 and $i % 10 == 0){
        $dataHash{$i} = "{\n\t\t\"type\": \"Feature\",\n\t\t\"geometry\": {\n\t\t\t\"type\": \"Point\",\n\t\t\t\"coordinates\": [$fields[12], $fields[13]]\n\t\t}\n\t},\n\t\t";
    }

	$i = $i + 1;
}

close CSV;

$dataHash{$i} = substr $dataHash{$i}, 0, -6;


open(my $fh, '>', $geojsonFileName) or die "Could not open file '$geojsonFileName' $!";

print $fh "{\n\t\"type\":\"FeatureCollection\",\n\t\"crs\": {\n\t\t\"type\": \"name\",\n\t\t\"properties\": {\n\t\t\t\"name\": \"EPSG:3857\"\n\t\t}\n\t},\n\t\"features\": [";

foreach my $key ( sort { $dataHash{$b} <=> $dataHash{$a}} keys $dataHash){
	print $fh "$dataHash{$key}";
}

print $fh "\n]}";

close $fh;