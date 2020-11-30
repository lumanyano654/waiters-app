module.exports = function waiterApp(pool) {
  async function insertUserName(name) {
    // var name = name.toUppercase(0, 1)

    var insertName = await pool.query(
      "INSERT INTO names(waiters_name)VALUES($1)",
      [name]
    );
  }
  async function returnWaiters() {
    const names = await pool.query("select waiters_name from names");
    return names.rows;
  }
  async function getdays() {
    var days = await pool.query("select * from work_days");
    return days.rows;
  }

  return {
    insertUserName,
    getdays,
    returnWaiters,
  };
};
