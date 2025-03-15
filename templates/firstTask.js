const firstTaskModule = (() => {
  const data = `city,population,area,density,country
    Shanghai,24256800,6340,3826,China
    Delhi,16787941,1484,11313,India
    Lagos,16060303,1171,13712,Nigeria
    Istanbul,14160467,5461,2593,Turkey
    Tokyo,13513734,2191,6168,Japan
    Sao Paulo,12038175,1521,7914,Brazil
    Mexico City,8874724,1486,5974,Mexico
    London,8673713,1572,5431,United Kingdom
    New York City,8537673,784,10892,United States
    Bangkok,8280925,1569,5279,Thailand`;

  let result = "Something went wrong";

  try {
    const isDataValid = typeof data === "string" || data !== "";

    if (!isDataValid) throw new Error(`Data is not suitable: ${data}`);

    const getLines = () => {
      const lines = data.split("\n");

      return lines;
    };

    const getCells = (line) => {
      return line.split(",");
    };

    const adaptData = (table, max) => {
      for (const row of table) {
        const a = Math.round((row[3] * 100) / max);
        row.push(a.toString());
      }
    };

    const sortRowsByColumn = (table, column) => {
      table.sort((r1, r2) => r2[column] - r1[column]);
    };

    const createTable = () => {
      const lines = getLines();
      const table = [];
      let max = 0;
      let i = 0;

      while (i < lines.length - 1) {
        i++;
        const cells = getCells(lines[i]);
        const d = parseInt(cells[3]);
        if (d > max) {
          max = d;
        }
        table.push([cells[0], cells[1], cells[2], cells[3], cells[4]]);
      }

      adaptData(table, max);

      sortRowsByColumn(table, 5);

      return table;
    };

    result = createTable();
  } catch (error) {
    result = error;
  } finally {
    return {
      execute: () => {
        if (typeof result === "object") {
          for (const row of result) {
            const s = [10, 8, 8, 18, 6].reduce(
              (accumulator, shift, index) =>
                accumulator + row[index + 1].padStart(shift),
              row[0].padEnd(18)
            );
            console.log(s);
          }
        } else {
          console.log(result);
        }
      },
    };
  }
})();

firstTaskModule.execute();
