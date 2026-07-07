export default class TestData {
    /*
      1. Dropdwon
       Tokyo CURA Healthcare Center
       Hongkong CURA Healthcare Center
       Seoul CURA Healthcare Center
      
      2. Healthcare Program
       Medicare
       Medicaid
       None
      
      3. Different Dates
         05/10/2026
         05/11/2026
         05/12/2026
                          
    */
    static makeAppoinmentTestData() {

        return [
            { testId: "TC001", facility: "Tokyo CURA Healthcare Center", hcp: "Medicare", visitDt: "05/10/2026" },
            { testId: "TC002", facility: "Hongkong CURA Healthcare Center", hcp: "Medicaid", visitDt: "05/10/2026" },
            { testId: "TC003", facility: "Seoul CURA Healthcare Center", hcp: "None", visitDt: "05/10/2026" }

        ]

    }

}