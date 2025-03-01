import { DatabaseProvider } from "./DatabaseProvider";
import { initConfig } from "../../../../config";

const runMigrations = async () => {
    initConfig(process.cwd());
    await DatabaseProvider.init();
    const migrations = await DatabaseProvider.datasource?.runMigrations();
    if(typeof migrations === 'undefined') {
        console.log('No se ejecutó ninguna migración.');
        return;
    }
    for(const migration of migrations) {
        console.log(`Migracion ${migration.name} ejecutada.`);
    }
};

runMigrations().then(() => {
    console.log("Migración finalizada.");
}).catch((err) => {
    console.log("Error al ejecutar las migraciones:", err);
}).finally(() => {
    process.exit();
});
