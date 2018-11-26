#!/usr/bin/perl -w
use strict;
use warnings;

############################################################
### Celso A. Uliana Jr - Nov 2018
############################################################

my %dataHash;

open CSV, "colar01.csv" or die "Couldn't open the file colar01.csv\n";


while(<CSV>){
	chomp;

	if(/^(.*),(\$GPS),(.*),(.*),(.*),(.*),(.*),(.*),(.*),(.*),(.*)$/){
		#print "$1 $2 $3 $4 $5 $6 $7 $8 $9 $10 $11\n";

		$dataHash{$6 . $7}{$3} = $4;
	}

	#stuff...
}

close CSV;

foreach my $key (keys %dataHash){
	print "$key\n";
}