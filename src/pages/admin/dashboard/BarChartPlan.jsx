import React, { useContext, useEffect, useState } from 'react';
import { ResponsiveContainer, BarChart, XAxis, YAxis, Bar, Cell, Tooltip, Legend } from 'recharts';
import { getSubscriptionsByMonthAndYear } from '../../../services/FunctionRepon';
import { PlansContext } from '../../../context/PlansProvider';
import { COLORS } from '../../../utils/Contants';
import SelectDate from './SelectDate';

const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
        const { planName, subscriptionCount } = payload[0].payload; // Extracting the correct properties
        return (
            <div style={{ backgroundColor: '#fff', border: '1px solid #ccc', padding: '10px', borderRadius: '5px' }}>
                <p style={{ color: payload[0].fill }}>Gói: {planName}</p>
                <p>Số lượng: {subscriptionCount}</p> {/* Updated to show subscriptionCount */}
            </div>
        );
    }
    return null;
};
// Custom Legend Component
const CustomLegend = ({ payload }) => {
    return (
        <ul style={{ listStyleType: 'none', padding: 0, display: "flex", justifyContent: "space-evenly" }}>
            {payload.map((entry, index) => (
                <li key={`item-${index}`} style={{ display: 'flex', alignItems: 'center' }}>
                    <span style={{ backgroundColor: entry.color, borderRadius: '50%', width: 12, height: 12, display: 'inline-block', marginRight: 5 }} />
                    <span>Gói:{entry.payload.planName}</span> {/* Displaying the plan name with "Gói:" prefix */}
                </li>
            ))}
        </ul>
    );
}

function BarChartPlan(props) {
    const [month, setMonth] = useState('');
    const [year, setYear] = useState('');
    const [data, setData] = useState([]);
    const plans = useContext(PlansContext);
    useEffect(() => {
        const fetchSubscriptions = async () => {
            try {
                const subscriptions = await getSubscriptionsByMonthAndYear(month, year);

                // Combine with the plans table to create the final result
                const result = plans.map(plan => ({
                    planId: plan.id,
                    planName: plan.title,
                    total: 0,
                }));
                // Count the number of subscriptions for each plan
                subscriptions.forEach(subscription => {
                    const planId = subscription.data.planId; // Assuming plan ID is stored here
                    const planIndex = result.findIndex(r => r.planId === planId);
                    if (planIndex >= 0) {
                        result[planIndex].total += subscription.data.totalPriceUSD; // Assuming total price is stored here
                    }
                });

                // Filter out plans with zero subscriptions
                const filteredResult = result.filter(item => item.subscriptionCount > 0);
                setData(filteredResult);
            } catch (error) {
                console.error("Error fetching subscriptions:", error);
            }
        };

        // Call the async function only if plans is not empty
        if (plans.length > 0) {
            fetchSubscriptions();
        }
    }, [year, month, plans]);

    return (
        <div>
            <SelectDate setMonth={setMonth} setYear={setYear} month={month} year={year} title="Thống kê số lượng phim thuê " />
            <div>
                <ResponsiveContainer width="100%" height={400}>
                    <BarChart data={data}>
                        <XAxis dataKey="planName" />
                        <YAxis />
                        <Bar dataKey="totalPriceUSD" fill="#8884d8">
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Bar>
                        <Tooltip content={<CustomTooltip />} />
                        <Legend content={<CustomLegend data={data} />} />
                    </BarChart>
                </ResponsiveContainer>

            </div>
        </div>

    );
}

export default BarChartPlan;