set -e

echo 
echo "Construyendo archivo wasm:"
echo 

npm run build:contract:debug

echo 
echo "Build terminado."
echo 