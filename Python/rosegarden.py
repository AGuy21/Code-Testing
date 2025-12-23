import pandas as pd
import numpy as np
import random
import time
import matplotlib.pyplot as plt
from tabulate import tabulate
# RUN CODE: python c:\Users\Jaxon\Documents\Coding\Code-Testing\Python\rosegarden.py
# ==========================================
# 🌹 THE ROSE GARDEN: ADVANCED SIMULATION
# ==========================================

# --- 1. FINANCIAL CONSTANTS ---
DEBT_PAYMENT = 225 + 200 #library expansion
INTEREST = 0
BASE_FIXED_COSTS = DEBT_PAYMENT + INTEREST 
BASE_STAFF = 2
DAILY_WAGE = 40 # Cost per employee per day

# FOR LIBRARY I WILL ADD +0.1 TO WINTER SEASONALITY
# --- 2. SEASONALITY ---
SEASONALITY = {
    1: 0.7 + 0.1,# Jan: Post-holiday slump
    2: 0.8 + 0.1,# Feb: Still cold/slow
    3: 0.9,  # Mar: Warming up
    4: 1.0,  # Apr: Normal
    5: 1.1,  # May: Good
    6: 1.2,  # Jun: Summer start
    7: 1.3,  # Jul: Peak Tourist
    8: 1.3,  # Aug: Peak Tourist
    9: 1.1,  # Sep: Students back
    10: 1.0, # Oct: Normal
    11: 0.9, # Nov: Pre-holiday lull
    12: 1.3+ 0.1,  # Dec: Holiday Rush
}

# --- 3. MENU & UNIT ECONOMICS ---
MENU = {
    # Day Items (Bakery/Cafe)
    'House Coffee':    {'price': 4.50, 'cost': 0.50, 'type': 'Day', 'prob': 0.9},
    'Butter Croissant':{'price': 5.00, 'cost': 1.20, 'type': 'Day', 'prob': 0.6},
    'Sourdough Loaf':  {'price': 9.00, 'cost': 2.50, 'type': 'Day', 'prob': 0.2},
    'Quiche Slice':    {'price': 8.50, 'cost': 2.00, 'type': 'Day', 'prob': 0.3},
    
    # Night Items (Dessert Bar/Patio)
    'Signature Tart':  {'price': 12.00, 'cost': 3.50, 'type': 'Night', 'prob': 0.8},
    'Macaron Tower':   {'price': 25.00, 'cost': 8.00, 'type': 'Night', 'prob': 0.4},
    'Dessert Wine':    {'price': 18.00, 'cost': 6.00, 'type': 'Night', 'prob': 0.6},
    'High Tea Set':    {'price': 45.00, 'cost': 15.00, 'type': 'Night', 'prob': 0.2},
    
    # Fees
    'Reservation':     {'price': 50.00, 'cost': 0.00, 'type': 'Fee', 'prob': 1.0}
}

# --- 3. CONSTRAINTS ---
NIGHT_CAPACITY = 20 

# --- 4. ADVERTISEMENT PACKAGES ---
ad_packages = {
    0: {
        "name": "No Marketing",
        "cost": 0,
        "desc": "Word of mouth only. Very low traffic.",
        "day_range": (2, 4),
        "night_range": (1, 2),
        "spending_tier": "Low",
        "rep_boost": -0.5 # Slow Decay
    },
    1: {
        "name": "University Posters",
        "cost": 500,
        "desc": "Targets students. Low spending power.",
        "day_range": (4, 10), 
        "night_range": (1, 3), 
        "spending_tier": "Low",
        "rep_boost": 0.8 # Slow growth
    },
    2: {
        "name": "Cozy Radio Spot",
        "cost": 1200,
        "desc": "Targets locals. Moderate spending power.",
        "day_range": (6, 12), 
        "night_range": (2, 5), 
        "spending_tier": "Mid",
        "rep_boost": 1.5 # Moderate growth
    },
    3: {
        "name": "TV Exclusivity",
        "cost": 3500, 
        "desc": "High-end. High spending power. Boosts ALL traffic.",
        "day_range": (6, 14), 
        "night_range": (4, 8), 
        "spending_tier": "High",
        "rep_boost": 3.0 # Fast growth
    }
}

class Customer:
    def __init__(self, day, cust_type, ad_tier):
        self.day = day
        self.type = cust_type # 'Day' or 'Night'
        self.status = self._determine_status(ad_tier)
        self.budget = self._set_budget()
        self.items_bought = []
        self.total_spent = 0
        self.total_cost = 0
        
    def _determine_status(self, ad_tier):
        roll = random.random()
        if ad_tier == 1: # University
            return 'Student' if roll < 0.8 else 'Local'
        elif ad_tier == 2: # Radio
            return 'Local' if roll < 0.7 else 'Student'
        else: # TV
            if roll < 0.5: return 'Local'
            elif roll < 0.9: return 'Elite'
            else: return 'Tourist'
            
    def _set_budget(self):
        # Lower budgets to make it harder
        if self.status == 'Student': return random.uniform(4, 10)
        elif self.status == 'Local': return random.uniform(8, 20)
        elif self.status == 'Tourist': return random.uniform(15, 35)
        elif self.status == 'Elite': return random.uniform(30, 80)
        return 10

    def shop(self):
        # Reservation Fee (Night Only - Mandatory)
        if self.type == 'Night':
            self.items_bought.append("Reservation ($50)")
            self.total_spent += MENU['Reservation']['price']
            self.total_cost += MENU['Reservation']['cost']
        
        # Buying Items
        remaining_budget = self.budget
        
        # Shuffle menu to randomize purchase order
        menu_items = list(MENU.items())
        random.shuffle(menu_items)
        
        for item_name, data in menu_items:
            if data['type'] == self.type or (data['type'] == 'Day' and self.type == 'Day'):
                # Check if they can afford it
                if data['price'] <= remaining_budget:
                    # Adjust purchase probability based on customer demographic
                    buy_prob = data['prob']
                    
                    if self.status == 'Student' and data['price'] > 10: buy_prob *= 0.2
                    if self.status == 'Elite' and data['price'] > 20: buy_prob *= 1.5
                    
                    if random.random() < buy_prob:
                        self.items_bought.append(item_name)
                        self.total_spent += data['price']
                        self.total_cost += data['cost']
                        remaining_budget -= data['price']

def simulate_month(ad_choice, current_reputation, month_num, player_rep, prev_ad_choice=None, streak=0):
    pkg = ad_packages[ad_choice]
    print(f"\n--- Simulating Month {month_num} with Strategy: {pkg['name']} ---")
    
    # Ad Fatigue Logic
    effectiveness = 1.0
    if ad_choice == prev_ad_choice and ad_choice != 0:
        if streak >= 3:
            effectiveness = 0.7 # -30% effectiveness if used 3+ times in a row
            print(f"[REALISM] Ad Fatigue: {pkg['name']} is becoming stale. Effectiveness dropped to 70%.")
        elif streak == 2:
            effectiveness = 0.9 # -10% effectiveness if used 2 times in a row
            print(f"[REALISM] Ad Fatigue: {pkg['name']} is slightly less effective.")
            
    print(f"Ad Cost: ${pkg['cost']}")
    print(f"Starting Reputation: {current_reputation:.1f}")
    
    all_customers = []
    daily_logs = []
    
    total_revenue = 0
    total_cm = 0
    
    # Calculate monthly reputation gain from marketing (diminished by fatigue)
    monthly_rep_gain = pkg['rep_boost'] * effectiveness
    daily_rep_gain = monthly_rep_gain / 30.0
    
    reputation = current_reputation
    
    # Seasonality Factor
    season_mod = SEASONALITY.get(month_num, 1.0)
    print(f"[REALISM] Seasonality: Month {month_num} traffic modifier is {season_mod}x")
    
    # Simulate 30 Days
    for day in range(1, 31):
        active_staff = BASE_STAFF
        
        # --- Environmental Factors ---
        is_weekend = (day % 7 == 0) or (day % 7 == 6)
        weather_roll = random.random()
        
        weather = "Normal"
        
        # Traffic multiplier based on reputation (1% per point)
        rep_mod = 1.0 + (reputation / 100.0)
        
        # Player Reputation Influence (0.0-1.0)
        # 0.0 = 50% traffic (Rude owner drives people away)
        # 1.0 = 100% traffic (Charismatic owner attracts same)
        player_mod = 0.6 + (0.5 * player_rep)
        
        # Combine all modifiers
        traffic_mod = rep_mod * player_mod * season_mod * effectiveness
        
        if weather_roll < 0.25: # 25% Bad Weather
            weather = "Stormy"
            traffic_mod *= 0.2 
        elif weather_roll < 0.35: # 10% Slow Days
            weather = "Slow"
            traffic_mod *= 0.5 
        elif weather_roll > 0.9:
            weather = "Perfect"
            traffic_mod *= 1.2
            
        if is_weekend:
            traffic_mod *= 1.1
            
        # --- Random Events (Daily) ---
        event_cost = 0
        event_note = ""
        
        # 12% chance of an event (More frequent & varied)
        if random.random() < 0.12:
            roll = random.random()
            
            # --- POSITIVE EVENTS (30%) ---
            if roll < 0.15:
                event_note = "[TIKTOK]"
                traffic_mod *= 2.5 # Huge spike
                reputation += 0.5
            elif roll < 0.30:
                event_note = "[FESTIVAL]"
                traffic_mod *= 1.5
                
            # --- NEGATIVE EVENTS (70%) ---
            elif roll < 0.40: # Rare Disaster
                event_note = "[FIRE]"
                event_cost = 800 
                traffic_mod = 0 
            elif roll < 0.55: # Health Inspector
                event_note = "[INSPECTOR]"
                traffic_mod *= 0.5 # Slow service
                if random.random() < 0.2: # 20% chance of fine
                    event_cost = 500
                    event_note += " (FINED)"
            elif roll < 0.75: # Equipment Failure
                event_note = "[BROKEN]"
                event_cost = 150 
                traffic_mod *= 0.7 
            elif roll < 0.90: # Staff Call-out
                event_note = "[SICK]"
                active_staff -= 1
                traffic_mod *= 0.75 # Slower service
                # event_cost = 0 # Wage saved, but capacity lost
            else: # Bad Review
                event_note = "[BAD REVIEW]"
                reputation -= 1.0 

        # --- Traffic Generation ---
        day_count = int(random.randint(*pkg['day_range']) * traffic_mod)
        night_count = int(random.randint(*pkg['night_range']) * traffic_mod)
        
        # Capacity Check
        night_lost = 0
        if night_count > NIGHT_CAPACITY:
            night_lost = night_count - NIGHT_CAPACITY
            night_count = NIGHT_CAPACITY
            
        # --- Process Individual Customers ---
        day_rev = 0
        day_cost = 0
        night_rev = 0
        night_cost = 0
        
        # Day Customers
        for _ in range(day_count):
            cust = Customer(day, 'Day', ad_choice)
            cust.shop()
            
            day_rev += cust.total_spent
            day_cost += cust.total_cost
            
            all_customers.append({
                'Month': month_num, 'Day': day, 'Type': 'Day', 'Status': cust.status, 'Weather': weather, 
                'Items': ", ".join(cust.items_bought), 'Revenue': cust.total_spent, 'Cost': cust.total_cost, 'Profit': cust.total_spent - cust.total_cost
            })
            
        # Night Customers
        for _ in range(night_count):
            cust = Customer(day, 'Night', ad_choice)
            cust.shop()
            
            night_rev += cust.total_spent
            night_cost += cust.total_cost
            
            all_customers.append({
                'Month': month_num, 'Day': day, 'Type': 'Night', 'Status': cust.status, 'Weather': weather, 
                'Items': ", ".join(cust.items_bought), 'Revenue': cust.total_spent, 'Cost': cust.total_cost, 'Profit': cust.total_spent - cust.total_cost
            })

        # Daily Totals
        # Labor Cost Calculation
        total_customers = day_count + night_count
        daily_fixed_labor = active_staff * DAILY_WAGE
        
        daily_rev = day_rev + night_rev
        daily_cost = day_cost + night_cost + event_cost + daily_fixed_labor
        daily_cm = daily_rev - daily_cost
        
        total_revenue += daily_rev
        total_cm += daily_cm
        
        # Reputation Logic (Daily Updates)
        reputation += daily_rep_gain
        
        # Customer Satisfaction Impact
        # If customers came but bought nothing (budget too low / prices too high), reputation drops
        if total_customers > 0:
            unhappy_customers = 0
            for c in all_customers[-total_customers:]: # Check the ones we just added
                if c['Revenue'] == 0:
                    unhappy_customers += 1
            
            if unhappy_customers > 0:
                rep_penalty = (unhappy_customers / total_customers) * 0.5
                reputation -= rep_penalty
        else:
            # No customers at all? That's bad for business visibility.
            reputation -= 0.05
            
        if night_lost > 5:
            reputation += 0.2 
        elif weather == "Perfect":
            reputation += 0.1
        
        # Natural Word of Mouth
        reputation += 0.05
        
        if reputation > 100: reputation = 100
        if reputation < 0: reputation = 0
        
        daily_logs.append({
            "Month": month_num,
            "Day": day,
            "Weather": weather,
            "Event": event_note,
            "Reputation": f"{reputation:.1f}",
            "Day Cust": day_count,
            "Night Cust": night_count,
            "Lost (Night)": night_lost,
            "Revenue": daily_rev,
            "CM": daily_cm
        })

    # Monthly Financials
    total_fixed_costs = BASE_FIXED_COSTS + pkg['cost']
    net_profit = total_cm - total_fixed_costs
    
    return daily_logs, all_customers, total_revenue, total_cm, total_fixed_costs, net_profit, reputation

def main():
    print(f"\n{'='*60}")
    print("🌹 ROSE GARDEN: LONG-TERM BUSINESS SIMULATION")
    print(f"{'='*60}")
    print("TIPS FOR SUCCESS:")
    print("- Seasonality matters! Winter is slow, Summer is busy.")
    print("- Don't spam the same ad! Effectiveness drops if used repeatedly.")
    print("- Watch your reputation. Unhappy customers hurt your brand.")
    print(f"{'='*60}")
    
    try:
        months_to_run = int(input("How many months do you want to simulate? (1-12): "))
    except ValueError:
        months_to_run = 1
        
    try:
        player_rep = float(input("Enter Player Reputation (0.0 - 1.0): "))
        if player_rep < 0: player_rep = 0.0
        if player_rep > 1: player_rep = 1.0
    except ValueError:
        player_rep = 0.5 # Default neutral
        
    current_reputation = 0.0
    
    all_daily_logs = []
    all_customer_data = []
    monthly_summaries = []
    
    cumulative_profit = 0
    
    # Track previous choices for fatigue logic
    prev_choice = None
    streak_count = 0
    
    for m in range(1, months_to_run + 1):
        print(f"\n--- MONTH {m} STRATEGY ---")
        print("Choose your Marketing Strategy:")
        for k, v in ad_packages.items():
            print(f"{k}. {v['name']} (Cost: ${v['cost']}) - {v['desc']}")
            
        choice_str = input(f"Enter Choice for Month {m} (0-3): ").strip()
        if choice_str not in ['0', '1', '2', '3']:
            choice = 0 
            print("Invalid choice. Defaulting to No Marketing.")
        else:
            choice = int(choice_str)
            
        # Update Streak
        if choice == prev_choice:
            streak_count += 1
        else:
            streak_count = 1
        prev_choice = choice
            
        # Run Month
        logs, customers, rev, cm, tfc, profit, new_rep = simulate_month(choice, current_reputation, m, player_rep, prev_choice, streak_count)
        
        # Update State
        current_reputation = new_rep
        cumulative_profit += profit
        
        # Store Data
        all_daily_logs.extend(logs)
        all_customer_data.extend(customers)
        monthly_summaries.append({
            "Month": m,
            "Strategy": ad_packages[choice]['name'],
            "Revenue": rev,
            "Profit": profit,
            "End_Reputation": new_rep
        })
        
        print(f"\n>>> MONTH {m} RESULTS <<<")
        print(f"Revenue: ${rev:,.2f}")
        print(f"Profit:  ${profit:,.2f}")
        print(f"Ending Reputation: {new_rep:.1f}")
        print(f"Cumulative Profit: ${cumulative_profit:,.2f}")
        
    # --- FINAL OUTPUTS ---
    
    # 1. Save Customer Data
    df_customers = pd.DataFrame(all_customer_data)
    df_customers.to_csv('rosegarden_detailed_customers.csv', index=False)
    print(f"\n[INFO] Detailed customer log saved to 'rosegarden_detailed_customers.csv'")

    # 2. Generate Graph
    df_daily = pd.DataFrame(all_daily_logs)
    df_daily['Global_Day'] = df_daily.index + 1
    
    plt.figure(figsize=(12, 8))
    
    plt.subplot(2, 1, 1)
    plt.plot(df_daily['Global_Day'], df_daily['Revenue'], color='blue', alpha=0.6, label='Daily Revenue')
    
    # Annotate Events on Graph
    event_days = df_daily[df_daily['Event'] != ""]
    for _, row in event_days.iterrows():
        # Extract just the emoji/first word for the label
        label = row['Event'].split()[0] 
        plt.annotate(label, 
                     (row['Global_Day'], row['Revenue']),
                     xytext=(0, 10), textcoords='offset points',
                     ha='center', fontsize=10, fontweight='bold', color='red')

    plt.title("Daily Revenue Over Time")
    plt.ylabel("Revenue ($)")
    plt.grid(True, alpha=0.3)
    
    plt.subplot(2, 1, 2)
    df_daily['Rep_Float'] = df_daily['Reputation'].astype(float)
    plt.plot(df_daily['Global_Day'], df_daily['Rep_Float'], color='purple', linewidth=2, label='Reputation (0-100)')
    plt.title("Brand Reputation Growth")
    plt.ylabel("Reputation Score")
    plt.xlabel("Global Day")
    plt.grid(True, alpha=0.3)
    
    plt.tight_layout()
    plt.savefig('rosegarden_longterm_chart.png')
    print(f"[INFO] Long-term performance graph saved to 'rosegarden_longterm_chart.png'")
    
    # 3. Summary Table
    df_summary = pd.DataFrame(monthly_summaries)
    print("\n=== FINAL SIMULATION SUMMARY ===")
    print(tabulate(df_summary, headers="keys", tablefmt="github", floatfmt=".2f"))
    
    print(f"\n{'='*40}")
    print(f"TOTAL CUMULATIVE PROFIT: ${cumulative_profit:,.2f}")
    print(f"{'='*40}")
    if cumulative_profit > 0:
        print("🎉 Congratulations! The Rose Garden is profitable!")
    else:
        print("📉 The business ended in debt. Better luck next time!")
        
if __name__ == "__main__":
    main()