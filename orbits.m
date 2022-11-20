% Oliver Rayner
% November 2022

% Orbit Plotter

function orbits(mu, a, e)

    % Calculate 
    r_pi        = a*(1-e);
    r_alpha     = a*(1+e);
    
    h           = (mu*a*(1-e^2))^0.5;
    v_pi        = h/r_pi;
    v_alpha     = h/r_alpha;
    
    T           = (4*pi^2 / mu * a^3)^0.5;
    
    % Plot
    b           = a*(1-e^2)^0.5;
    
    t           = linspace(0, 2*pi);
    X           = a*cos(t);
    Y           = b*sin(t);
    
    f = figure
    hold on
    plot(X, Y, 'LineWidth', 2)
    plot(a*e, 0, 'k.', 'MarkerSize', 20)
    plot(a*e + r_pi, 0, 'r.', 'MarkerSize', 20)
    plot(a*e - r_alpha, 0, 'r.', 'MarkerSize', 20)
    axis(1.05*a*[-1,1,-1,1])
    saveas(f, 'orbit.jpg')
    
    % Disp
    fprintf('Periapsis:\n')
    fprintf('r_π        = %s\n', r_pi)
    fprintf('v_π        = %s\n\n', v_pi)
    fprintf('Apoapsis:\n')
    fprintf('r_α        = %s\n', r_alpha)
    fprintf('v_α        = %s\n\n', v_alpha)
    fprintf('Other Parameters:\n')
    fprintf('T          = %s\n', T)
    fprintf('h          = %s\n', h)

end
