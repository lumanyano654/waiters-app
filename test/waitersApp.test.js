const assert = require("assert");
const waitersAppFact = require("../waiters");
const pg = require("pg");
const Pool = pg.Pool;

const connectionString =
  process.env.DATABASE_URL ||
  "postgresql://lumanyano:sanelisiwe@localhost:5432/waiters_tests";

const pool = new Pool({
  connectionString,
});
const waitersAppInst = waitersAppFact(pool);
describe("The waiters availability webapp",  function () {
  beforeEach(async function () {
    await pool.query("delete from names;");
  });

  it("should insert names in the database", async function(){
     const  insertTest = await waitersAppInst.insertUserName("lumanyano")

     const getNames = await waitersAppInst.returnWaiters()

      assert.deepEqual(getNames,[
        {
          waiters_name: 'lumanyano'
        }
      ])
  })

});
