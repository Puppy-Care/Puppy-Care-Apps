# Puppy-Care-Apps
 cuando al recargar el google chromer de errores hay que eliminar los nodeModules y de ahi el siguiente codigo
npm install ws@3.3.2 --save-dev --save-exact

luego digitamos

npm install

para que se isntalen el resto de dependencias 


-- ERROR TypeError: Object(...) is not a function at new FitBoundsService after npm upgrade #1507
you can fix this issue instaling the previous version of the @agm/core
remove you current version : npm uninstall @agm/core
then install this version: npm i @agm/core@1.0.0-beta.3 --save