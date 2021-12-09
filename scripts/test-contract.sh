set -e

echo 
echo "Begin testing contract:"
echo 

cd contract && npm run test

echo 
echo "End of contract testing."
echo 