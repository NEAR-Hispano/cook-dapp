set -e

echo 
echo "Construyendo archivo wasm:"
echo 

npm run build:contract:debug

echo 
echo "Desplagando en modo desarrollo:"
echo 

npm run dev:deploy:contract

echo 
echo "Contrato desplegado en modo desarrollo."
echo 