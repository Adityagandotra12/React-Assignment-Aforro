import { useId } from 'react'

/** Smooth cubic path through points (Catmull-Rom → Bézier segments). */
function smoothLineThrough(points) {
  if (points.length < 2) return ''
  let d = `M ${points[0].x} ${points[0].y}`
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[Math.max(0, i - 1)]
    const p1 = points[i]
    const p2 = points[i + 1]
    const p3 = points[Math.min(points.length - 1, i + 2)]
    const cp1x = p1.x + (p2.x - p0.x) / 6
    const cp1y = p1.y + (p2.y - p0.y) / 6
    const cp2x = p2.x - (p3.x - p1.x) / 6
    const cp2y = p2.y - (p3.y - p1.y) / 6
    d += ` C ${cp1x},${cp1y} ${cp2x},${cp2y} ${p2.x},${p2.y}`
  }
  return d
}

function smoothAreaThrough(points, bottomY) {
  const line = smoothLineThrough(points)
  if (!line) return ''
  const last = points[points.length - 1]
  const first = points[0]
  return `${line} L ${last.x},${bottomY} L ${first.x},${bottomY} Z`
}

function ChartSection() {
  const uid = useId().replace(/:/g, '')

  const satBottom = 118
  const satXs = [0, 400 / 6, (400 / 6) * 2, (400 / 6) * 3, (400 / 6) * 4, (400 / 6) * 5, 400]
  /** Green = This month — ends higher on the right */
  const satGreenY = [30, 45, 37, 54, 35, 66, 20]
  /** Blue = Last month — lower / more volatile */
  const satBlueY = [76, 60, 94, 94, 84, 85, 62]
  const satGreenPts = satXs.map((x, i) => ({ x, y: satGreenY[i] }))
  const satBluePts = satXs.map((x, i) => ({ x, y: satBlueY[i] }))
  const satGreenArea = smoothAreaThrough(satGreenPts, satBottom)
  const satBlueArea = smoothAreaThrough(satBluePts, satBottom)
  const satGreenLine = smoothLineThrough(satGreenPts)
  const satBlueLine = smoothLineThrough(satBluePts)

  const monthShort = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  const visitorXPad = 22
  const visitorPlotW = 400 - 2 * visitorXPad
  const visitorXs = monthShort.map((_, i) => visitorXPad + (visitorPlotW / (monthShort.length - 1)) * i)
  const visitorPurpleY = [36, 44, 72, 102, 118, 100, 72, 56, 64, 94, 128, 152]
  const visitorRedY = [86, 90, 124, 150, 132, 74, 42, 28, 44, 80, 120, 154]
  const visitorGreenY = [74, 46, 52, 76, 108, 122, 104, 78, 62, 72, 108, 122]
  const visitorPurplePts = visitorXs.map((x, i) => ({ x, y: visitorPurpleY[i] }))
  const visitorRedPts = visitorXs.map((x, i) => ({ x, y: visitorRedY[i] }))
  const visitorGreenPts = visitorXs.map((x, i) => ({ x, y: visitorGreenY[i] }))
  const visitorPurpleLine = smoothLineThrough(visitorPurplePts)
  const visitorRedLine = smoothLineThrough(visitorRedPts)
  const visitorGreenLine = smoothLineThrough(visitorGreenPts)
  const visitorFocusIndex = 7
  const visitorFocusX = visitorXs[visitorFocusIndex]
  const visitorFocusY = visitorRedY[visitorFocusIndex]
  const revenueRows = [
    { day: 'Mon', online: 14, offline: 12.5 },
    { day: 'Tue', online: 17, offline: 12 },
    { day: 'Wed', online: 6, offline: 22.5 },
    { day: 'Thu', online: 15.8, offline: 6.5 },
    { day: 'Fri', online: 12.2, offline: 11.4 },
    { day: 'Sat', online: 16.7, offline: 13.4 },
    { day: 'Sun', online: 21, offline: 11.2 },
  ]

  return (
    <>
      <article className="dash-card chart-visitor" aria-labelledby="visitor-heading">
        <div className="dash-card__head">
          <h3 id="visitor-heading" className="dash-card__title dash-card__title--widget">
            Visitor Insights
          </h3>
        </div>
        <div className="dash-card__body dash-card__body--chart dash-card__body--visitor">
          <div className="visitor-chart-frame" role="img" aria-label="Visitor insights lines by month">
            <div className="visitor-chart__y" aria-hidden="true">
              {['400', '300', '200', '100', '0'].map((t) => (
                <span key={t}>{t}</span>
              ))}
            </div>
            <div className="visitor-chart__plot">
              <div className="visitor-chart__grid" aria-hidden="true" />
              <svg className="visitor-chart" viewBox="0 0 400 170" preserveAspectRatio="none" aria-hidden="true">
                <path d={visitorPurpleLine} fill="none" stroke="#A020F0" strokeWidth="2.2" strokeLinecap="round" />
                <path d={visitorRedLine} fill="none" stroke="#EF4444" strokeWidth="2.2" strokeLinecap="round" />
                <path d={visitorGreenLine} fill="none" stroke="#35C759" strokeWidth="2.2" strokeLinecap="round" />
                <line
                  x1={visitorFocusX}
                  y1="8"
                  x2={visitorFocusX}
                  y2="168"
                  stroke="#fb7185"
                  strokeWidth="1.4"
                  strokeDasharray="2 3"
                  opacity="0.85"
                />
                <circle cx={visitorFocusX} cy={visitorFocusY} r="6.2" fill="#fb4c63" />
              </svg>
            </div>
          </div>
          <div className="visitor-chart__x">
            {monthShort.map((m, i) => (
              <span key={`${m}-${i}`}>{m}</span>
            ))}
          </div>
          <div className="visitor-chart__legend">
            <span title="Loyal Customers">
              <i className="visitor-chart__sw visitor-chart__sw--purple" aria-hidden="true" /> Loyal
            </span>
            <span title="New Customers">
              <i className="visitor-chart__sw visitor-chart__sw--red" aria-hidden="true" /> New
            </span>
            <span title="Unique Customers">
              <i className="visitor-chart__sw visitor-chart__sw--green" aria-hidden="true" /> Unique
            </span>
          </div>
        </div>
      </article>

      <div className="charts-mid">
        <article className="dash-card chart-revenue" aria-labelledby="revenue-heading">
          <div className="dash-card__head">
            <h3 id="revenue-heading" className="dash-card__title">
              Total Revenue
            </h3>
          </div>
          <div className="dash-card__body dash-card__body--revenue">
            <div className="revenue-chart" role="img" aria-label="Total Revenue bar chart with online and offline sales by weekday">
              <div className="revenue-chart__y" aria-hidden="true">
                <span>25k</span>
                <span>20k</span>
                <span>15k</span>
                <span>10k</span>
                <span>5k</span>
                <span>0</span>
              </div>
              <div className="revenue-chart__plot">
                <div className="revenue-chart__grid" aria-hidden="true" />
                <div className="dual-bar-chart">
                  {revenueRows.map((row) => {
                    const online = (row.online / 25) * 100
                    const offline = (row.offline / 25) * 100
                    return (
                      <div key={row.day} className="dual-bar-chart__col">
                        <div className="dual-bar-chart__bars">
                          <div className="dual-bar-chart__bar dual-bar-chart__bar--online" style={{ height: `${online}%` }} />
                          <div className="dual-bar-chart__bar dual-bar-chart__bar--offline" style={{ height: `${offline}%` }} />
                        </div>
                        <span className="dual-bar-chart__label">{row.day}</span>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
            <div className="dual-legend dual-legend--center">
              <span>
                <i className="dual-legend__dot dual-legend__dot--online" /> Online Sales
              </span>
              <span>
                <i className="dual-legend__dot dual-legend__dot--offline" /> Offline Sales
              </span>
            </div>
          </div>
        </article>

        <article className="dash-card chart-satisfaction" aria-labelledby="sat-heading">
          <div className="dash-card__head">
            <h3 id="sat-heading" className="dash-card__title dash-card__title--widget">
              Customer Satisfaction
            </h3>
          </div>
          <div className="dash-card__body dash-card__body--chart dash-card__body--sat">
            <svg className="satisfaction-chart" viewBox="0 0 400 118" preserveAspectRatio="none" aria-hidden="true">
              <defs>
                <linearGradient id={`${uid}sBlue`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="rgba(59, 130, 246, 0.38)" />
                  <stop offset="100%" stopColor="rgba(59, 130, 246, 0)" />
                </linearGradient>
                <linearGradient id={`${uid}sGreen`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="rgba(34, 197, 94, 0.34)" />
                  <stop offset="100%" stopColor="rgba(34, 197, 94, 0)" />
                </linearGradient>
              </defs>
              {/* Draw blue area first, then green (green reads as “This month” on top) */}
              <path d={satBlueArea} fill={`url(#${uid}sBlue)`} />
              <path d={satGreenArea} fill={`url(#${uid}sGreen)`} />
              <path d={satBlueLine} fill="none" stroke="#3b82f6" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round" />
              <path d={satGreenLine} fill="none" stroke="#22c55e" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round" />
              {satBluePts.map((p, idx) => (
                <circle key={`b-${idx}`} cx={p.x} cy={p.y} r="4.15" fill="#3b82f6" />
              ))}
              {satGreenPts.map((p, idx) => (
                <circle key={`g-${idx}`} cx={p.x} cy={p.y} r="4.15" fill="#22c55e" />
              ))}
            </svg>
            <div className="sat-legend" aria-hidden="true">
              <div className="sat-legend__item">
                <div className="sat-legend__row">
                  <svg className="sat-legend__badge" width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
                    <circle cx="9" cy="9" r="8" fill="#3b82f6" />
                    <path d="M9 5.5v7M5.5 9h7" stroke="#fff" strokeWidth="1.55" strokeLinecap="round" />
                  </svg>
                  <span className="sat-legend__label">Last Month</span>
                </div>
                <strong className="sat-legend__value">$3,004</strong>
              </div>
              <div className="sat-legend__divider" />
              <div className="sat-legend__item">
                <div className="sat-legend__row">
                  <svg className="sat-legend__badge" width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
                    <circle cx="9" cy="9" r="8" fill="#22c55e" />
                    <path d="M9 5.5v7M5.5 9h7" stroke="#fff" strokeWidth="1.55" strokeLinecap="round" />
                  </svg>
                  <span className="sat-legend__label">This Month</span>
                </div>
                <strong className="sat-legend__value">$4,504</strong>
              </div>
            </div>
          </div>
        </article>

        <article className="dash-card chart-target" aria-labelledby="target-heading">
          <div className="dash-card__head">
            <h3 id="target-heading" className="dash-card__title">
              Target vs Reality
            </h3>
          </div>
          <div className="dash-card__body dash-card__body--target">
            <div className="target-chart-wrap">
              <div className="target-chart__grid" aria-hidden="true" />
              <div className="target-bar-chart" role="img" aria-label="Target versus reality bars by month">
                {[
                  [56, 73],
                  [49, 64],
                  [41, 84],
                  [58, 66],
                  [69, 95],
                  [69, 95],
                  [70, 95],
                ].map(([realityPct, targetPct], i) => {
                  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July']
                  return (
                    <div key={months[i]} className="target-bar-chart__col">
                      <div className="target-bar-chart__bars">
                        <div
                          className="target-bar-chart__bar target-bar-chart__bar--reality"
                          style={{ height: `${realityPct}%` }}
                        />
                        <div
                          className="target-bar-chart__bar target-bar-chart__bar--target"
                          style={{ height: `${targetPct}%` }}
                        />
                      </div>
                      <span className="target-bar-chart__label">{months[i]}</span>
                    </div>
                  )
                })}
              </div>
            </div>
            <div className="target-cards">
              <div className="target-card">
                <span className="target-card__icon target-card__icon--reality" aria-hidden="true">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M7 7V5a5 5 0 0 1 10 0v2"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                    />
                    <path
                      d="M5 7h14v11a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V7z"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <div className="target-card__text">
                  <div className="target-card__title">Reality Sales</div>
                  <div className="target-card__sub">Global</div>
                </div>
                <div className="target-card__value target-card__value--reality">8.823</div>
              </div>
              <div className="target-card">
                <span className="target-card__icon target-card__icon--target" aria-hidden="true">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="4" y="12" width="4.5" height="8" rx="1" fill="currentColor" />
                    <rect x="9.75" y="8" width="4.5" height="12" rx="1" fill="currentColor" />
                    <rect x="15.5" y="4" width="4.5" height="16" rx="1" fill="currentColor" />
                  </svg>
                </span>
                <div className="target-card__text">
                  <div className="target-card__title">Target Sales</div>
                  <div className="target-card__sub">Commercial</div>
                </div>
                <div className="target-card__value target-card__value--target">12.122</div>
              </div>
            </div>
          </div>
        </article>
      </div>

      <article className="dash-card chart-map" aria-labelledby="map-heading">
        <div className="dash-card__head">
          <h3 id="map-heading" className="dash-card__title dash-card__title--widget">
            Sales Mapping by Country
          </h3>
        </div>
        <div className="dash-card__body dash-card__body--map">
          <img
            className="world-map-svg world-map-svg--custom"
            src={`${import.meta.env.BASE_URL}world-map-custom.png`}
            alt="World map with highlighted countries"
          />
        </div>
      </article>

      <article className="dash-card chart-volume" aria-labelledby="vol-heading">
        <div className="dash-card__head">
          <h3 id="vol-heading" className="dash-card__title dash-card__title--widget">
            Volume vs Service Level
          </h3>
        </div>
        <div className="dash-card__body dash-card__body--volume">
          <div className="stacked-bar-chart" role="img" aria-label="Stacked bars: Volume on top in blue, Services below in green, by period">
            {[
              /* Match reference: 2nd tallest, 5th shortest, stepped down to the right */
              { h: 166, vol: 33, svc: 27 },
              { h: 214, vol: 31, svc: 29 },
              { h: 166, vol: 41, svc: 19 },
              { h: 142, vol: 38, svc: 22 },
              { h: 96, vol: 30, svc: 18 },
              { h: 110, vol: 25, svc: 25 },
            ].map((bar, i) => (
              <div key={i} className="stacked-bar-chart__col">
                <div className="stacked-bar-chart__stack" style={{ height: `${bar.h}px` }}>
                  <div
                    className="stacked-bar-chart__seg stacked-bar-chart__seg--volume"
                    style={{ flex: bar.vol }}
                  />
                  <div
                    className="stacked-bar-chart__seg stacked-bar-chart__seg--services"
                    style={{ flex: bar.svc }}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="volume-legend">
            <div className="volume-legend__item">
              <div className="volume-legend__row">
                <span className="volume-legend__dot volume-legend__dot--volume" aria-hidden="true" />
                <span className="volume-legend__label">Volume</span>
              </div>
              <strong className="volume-legend__value">1,135</strong>
            </div>
            <div className="volume-legend__divider" aria-hidden="true" />
            <div className="volume-legend__item">
              <div className="volume-legend__row">
                <span className="volume-legend__dot volume-legend__dot--services" aria-hidden="true" />
                <span className="volume-legend__label">Services</span>
              </div>
              <strong className="volume-legend__value">635</strong>
            </div>
          </div>
        </div>
      </article>
    </>
  )
}

export default ChartSection
