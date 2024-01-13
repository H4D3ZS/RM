const DashBoardView = () => {
  return (
    <div>
      <div class="sidebar">
        <BrowserRouter>
          <SideBarLeft>
            <Routes>
              <Route path="/ActivityFeed" element={<ActivityFeed />} />
              <Route path="/Applications" element={<Applications />} />
              <Route path="/Job_listing" element={<Job_listing />} />
              <Route path="/Employees" element={<Employees />} />
              <Route path="/Payouts" element={<Payouts />} />
              <Route path="/Referal_Program" element={<Referal_Program />} />
              <Route path="/Company" element={<Company />} />
              <Route path="/LeaderBoard" element={<LeaderBoard />} />
            </Routes>
          </SideBarLeft>
        </BrowserRouter>
      </div>

      <div>
        <div>
          {/* Dito Dapat ang CardView */}
          <div class="cardview-container">
            <div class="cardview-list">
              <CardView
                namelabel="Employee Participation"
                numberlabel="126"
                percentage="2.5"
                image
                subparagraph={" vs last month"}
              />
            </div>

            <div class="cardview-list">
              <CardView
                namelabel="Employee Participation"
                numberlabel="126"
                percentage="2.5"
                image
                subparagraph={" vs last month"}
              />
            </div>

            <div class="cardview-list">
              <CardView
                namelabel="Employee Participation"
                numberlabel="126"
                percentage="2.5"
                image
                subparagraph={" vs last month"}
              />
            </div>

            <div class="cardview-list">
              <CardView
                namelabel="Employee Participation"
                numberlabel="126"
                percentage="2.5"
                image
                subparagraph={" vs last month"}
              />
            </div>
          </div>

          <div></div>
        </div>

        <div>
          {/* Charts */}

          <BarChart />

          <BarChart2 />

          <DoughnutChart />
          <LineChart />
          <ReferalTrendChart />
        </div>
      </div>
    </div>
  );
};

export default DashBoardView;
