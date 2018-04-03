#include <iostream>
#include <math.h>
#include <ctype.h>

using namespace std;

int dectobin(int dec, int power_of_two)
{
	if(dec == 0)
	{
	    cout<<"0";
	}
	else if(dec/(int)pow(2, power_of_two))
	{
		int remainder = dectobin(dec, power_of_two+1);
		if(remainder/(int)pow(2, power_of_two))
		{
			cout<<"1";
			return remainder - (int)pow(2, power_of_two);
		}
		else
		{
			cout<<"0";
			return remainder;
		}
	}
	else
	{
		return dec;
	}
}

int main(int argc, char *argv[])
{
        if(argc != 2)
        {
                cout<<"Input is of format 'dectobin num'";
                return 1;
        }
        dectobin(atoi(argv[1]), 0);
}
